<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreContractRequest;
use App\Http\Requests\UpdateContractRequest;
use App\Models\Contract;
use App\Models\Customer;
use App\Services\CreateContractInstallmentsService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ContractController extends Controller
{
    public function __construct(
        private CreateContractInstallmentsService $installmentsService
    ) {}

    public function index(Request $request)
    {
        $contracts = Contract::with('customer')
            ->where('user_id', $request->user()->id)
            ->when($request->search, fn ($q, $s) => $q->where('code', 'like', "%{$s}%"))
            ->when($request->status, fn ($q, $s) => $q->where('status', $s))
            ->orderByDesc('created_at')
            ->paginate(15)
            ->withQueryString();

        return Inertia::render('Contracts/Index', [
            'contracts' => $contracts,
            'filters' => $request->only('search', 'status'),
        ]);
    }

    public function create(Request $request)
    {
        $customers = Customer::where('user_id', $request->user()->id)->orderBy('name')->get();

        return Inertia::render('Contracts/Create', [
            'customers' => $customers,
        ]);
    }

    public function store(StoreContractRequest $request)
    {
        $contract = Contract::create(array_merge(
            $request->validated(),
            [
                'user_id' => $request->user()->id,
                'code' => $this->generateCode(),
            ]
        ));

        $this->installmentsService->execute($contract);

        return redirect()->route('contracts.index')->with('success', 'Contrato criado com sucesso.');
    }

    public function show(Contract $contract)
    {
        $contract->load(['customer', 'installments.payments']);

        return Inertia::render('Contracts/Show', [
            'contract' => $contract,
        ]);
    }

    public function edit(Contract $contract, Request $request)
    {
        $customers = Customer::where('user_id', $request->user()->id)->orderBy('name')->get();

        return Inertia::render('Contracts/Edit', [
            'contract' => $contract,
            'customers' => $customers,
        ]);
    }

    public function update(UpdateContractRequest $request, Contract $contract)
    {
        $contract->update($request->validated());

        return redirect()->route('contracts.index')->with('success', 'Contrato atualizado com sucesso.');
    }

    public function destroy(Contract $contract)
    {
        $contract->delete();

        return redirect()->route('contracts.index')->with('success', 'Contrato removido com sucesso.');
    }

    private function generateCode(): string
    {
        return 'CTR-'.str_pad(Contract::max('id') + 1, 5, '0', STR_PAD_LEFT);
    }
}
