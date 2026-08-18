<?php

namespace App\Services;

use App\Models\Contract;
use App\Models\Installment;

class CreateContractInstallmentsService
{
    public function execute(Contract $contract): array
    {
        $installments = [];
        $date = $contract->first_payment_date->copy();

        for ($i = 1; $i <= $contract->total_installments; $i++) {
            $installments[] = Installment::create([
                'contract_id' => $contract->id,
                'installment_number' => $i,
                'due_date' => $date->copy(),
                'amount_due' => $contract->amount / $contract->total_installments,
                'status' => $date->isPast() ? 'overdue' : 'pending',
            ]);

            $date = match ($contract->payment_frequency) {
                'weekly' => $date->addWeek(),
                'biweekly' => $date->addWeeks(2),
                'monthly' => $date->addMonthNoOverflow(),
                'quarterly' => $date->addMonthsNoOverflow(3),
                'semiannually' => $date->addMonthsNoOverflow(6),
                'annually' => $date->addYearNoOverflow(),
                default => $date->addMonthNoOverflow(),
            };
        }

        return $installments;
    }
}
