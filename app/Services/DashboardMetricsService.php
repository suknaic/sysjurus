<?php

namespace App\Services;

use App\Models\Contract;
use App\Models\Customer;
use App\Models\Installment;
use App\Models\Payment;
use App\Models\SalaryRecord;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class DashboardMetricsService
{
    public function getMetrics(array $filters = []): array
    {
        $userId = $filters['user_id'] ?? auth()->id();
        $today = Carbon::today();

        $totalCustomers = Customer::where('user_id', $userId)->count();
        $totalContracts = Contract::where('user_id', $userId)->where('status', 'active')->count();

        $installments = Installment::whereHas('contract', fn($q) => $q->where('user_id', $userId));

        $toReceive = (clone $installments)->where('status', 'pending')->where('due_date', '>', $today)->sum('amount_due');
        $overdue = (clone $installments)->where('status', 'overdue')->sum('amount_due');
        $receivedToday = (clone $installments)->where('status', 'paid')->whereDate('paid_at', $today)->sum('amount_paid');
        $totalReceived = (clone $installments)->where('status', 'paid')->sum('amount_paid');

        $pendingCount = (clone $installments)->where('status', 'pending')->count();
        $overdueCount = (clone $installments)->where('status', 'overdue')->count();
        $paidCount = (clone $installments)->where('status', 'paid')->count();

        return compact(
            'totalCustomers', 'totalContracts',
            'toReceive', 'overdue', 'receivedToday', 'totalReceived',
            'pendingCount', 'overdueCount', 'paidCount'
        );
    }

    public function getRecentInstallments(int $userId, int $limit = 10): \Illuminate\Support\Collection
    {
        return Installment::whereHas('contract', fn($q) => $q->where('user_id', $userId))
            ->with('contract.customer')
            ->orderByDesc('due_date')
            ->limit($limit)
            ->get();
    }
}
