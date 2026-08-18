<?php

namespace App\Http\Controllers;

use App\Models\Payment;
use App\Services\ReceiveInstallmentPaymentService;
use Illuminate\Http\Request;

class PaymentController extends Controller
{
    public function destroy(Payment $payment)
    {
        $installment = $payment->installment;
        $installment->amount_paid -= $payment->amount;

        if ($installment->amount_paid <= 0) {
            $installment->status = 'pending';
            $installment->paid_at = null;
        } else {
            $installment->status = 'partial';
        }

        $installment->save();
        $payment->delete();

        return back()->with('success', 'Pagamento removido com sucesso.');
    }
}
