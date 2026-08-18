<?php

namespace App\Services;

use App\Models\Installment;
use App\Models\Payment;
use Carbon\Carbon;

class ReceiveInstallmentPaymentService
{
    public function execute(Installment $installment, array $data): Payment
    {
        $payment = Payment::create([
            'installment_id' => $installment->id,
            'user_id' => auth()->id(),
            'amount' => $data['amount'],
            'payment_date' => $data['payment_date'] ?? Carbon::today(),
            'payment_method' => $data['payment_method'] ?? null,
            'reference' => $data['reference'] ?? null,
            'notes' => $data['notes'] ?? null,
        ]);

        $installment->amount_paid += $data['amount'];
        $installment->paid_at = $installment->amount_paid >= $installment->amount_due ? Carbon::now() : null;
        $installment->status = $installment->amount_paid >= $installment->amount_due ? 'paid' : 'partial';
        $installment->save();

        return $payment;
    }
}
