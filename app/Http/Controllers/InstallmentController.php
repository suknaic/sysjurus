<?php

namespace App\Http\Controllers;

use App\Models\Installment;
use App\Services\ReceiveInstallmentPaymentService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class InstallmentController extends Controller
{
    public function __construct(
        private ReceiveInstallmentPaymentService $paymentService
    ) {}

    public function index(Request $request)
    {
        $installments = Installment::with('contract.customer')
            ->whereHas('contract', fn($q) => $q->where('user_id', $request->user()->id))
            ->when($request->status, fn($q, $s) => $q->where('status', $s))
            ->orderBy('due_date')
            ->paginate(15)
            ->withQueryString();

        $metrics = [
            'total_pending' => (clone $installments)->getCollection()->filter(fn($i) => $i->status === 'pending')->sum('amount_due'),
            'total_overdue' => (clone $installments)->getCollection()->filter(fn($i) => $i->status === 'overdue')->sum('amount_due'),
            'total_paid' => (clone $installments)->getCollection()->filter(fn($i) => $i->status === 'paid')->sum('amount_paid'),
        ];

        return Inertia::render('Installments/Index', [
            'installments' => $installments,
            'metrics' => $metrics,
            'filters' => $request->only('status'),
        ]);
    }

    public function show(Installment $installment)
    {
        $installment->load(['contract.customer', 'payments.user']);

        return Inertia::render('Installments/Show', [
            'installment' => $installment,
        ]);
    }

    public function update(Request $request, Installment $installment)
    {
        $payment = $this->paymentService->execute($installment, $request->only([
            'amount', 'payment_date', 'payment_method', 'reference', 'notes',
        ]));

        return back()->with('success', 'Pagamento registrado com sucesso.');
    }
}
