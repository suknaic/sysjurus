<?php

namespace App\Services;

use App\Models\Contract;
use App\Models\Installment;
use Illuminate\Database\Eloquent\Builder;

class ReportBuilderService
{
    public function build(array $filters): \Illuminate\Support\Collection
    {
        $query = Contract::with(['customer', 'installments'])
            ->where('user_id', auth()->id());

        if (!empty($filters['status'])) {
            $query->where('status', $filters['status']);
        }

        if (!empty($filters['customer_id'])) {
            $query->where('customer_id', $filters['customer_id']);
        }

        if (!empty($filters['date_from'])) {
            $query->where('created_at', '>=', $filters['date_from']);
        }

        if (!empty($filters['date_to'])) {
            $query->where('created_at', '<=', $filters['date_to']);
        }

        return $query->orderByDesc('created_at')->get();
    }
}
