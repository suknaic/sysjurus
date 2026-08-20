<?php

namespace App\Services;

use App\Models\Contract;
use Carbon\Carbon;
use Illuminate\Support\Collection;

class ReportBuilderService
{
    public function build(array $filters): Collection
    {
        $query = Contract::with(['customer', 'installments'])
            ->where('user_id', auth()->id());

        if (! empty($filters['status'])) {
            $query->where('status', $filters['status']);
        }

        if (! empty($filters['customer_id'])) {
            $query->where('customer_id', $filters['customer_id']);
        }

        if (! empty($filters['date_from'])) {
            $query->where('first_payment_date', '>=', $filters['date_from']);
        }

        if (! empty($filters['date_to'])) {
            $query->where('first_payment_date', '<=', Carbon::parse($filters['date_to'])->addDay()->toDateString());
        }

        return $query->orderByDesc('created_at')->get();
    }
}
