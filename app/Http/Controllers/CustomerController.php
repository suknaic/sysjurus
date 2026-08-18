<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCustomerRequest;
use App\Http\Requests\UpdateCustomerRequest;
use App\Models\Customer;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CustomerController extends Controller
{
    public function index(Request $request)
    {
        $customers = Customer::with('contracts')->where('user_id', $request->user()->id)
            ->when($request->search, fn ($q, $s) => $q->where('name', 'like', "%{$s}%")->orWhere('email', 'like', "%{$s}%"))
            ->orderByDesc('created_at')
            ->paginate(15)
            ->withQueryString();

        return Inertia::render('Customers/Index', [
            'customers' => $customers,
            'filters' => $request->only('search'),
        ]);
    }

    public function create()
    {
        return Inertia::render('Customers/Create');
    }

    public function store(StoreCustomerRequest $request)
    {
        $customer = Customer::create(array_merge(
            $request->validated(),
            ['user_id' => $request->user()->id]
        ));

        return redirect()->route('customers.index')->with('success', 'Cliente cadastrado com sucesso.');
    }

    public function show(Customer $customer)
    {
        $customer->load('contracts.installments');

        return Inertia::render('Customers/Show', [
            'customer' => $customer,
        ]);
    }

    public function edit(Customer $customer)
    {
        return Inertia::render('Customers/Edit', [
            'customer' => $customer,
        ]);
    }

    public function update(UpdateCustomerRequest $request, Customer $customer)
    {
        $customer->update($request->validated());

        return redirect()->route('customers.index')->with('success', 'Cliente atualizado com sucesso.');
    }

    public function destroy(Customer $customer)
    {
        if ($customer->contracts()->exists()) {
            return back()->withErrors(['customer' => 'Nao e possivel remover cliente com contratos ativos. Remova ou transfira os contratos primeiro.']);
        }

        $customer->delete();

        return redirect()->route('customers.index')->with('success', 'Cliente removido com sucesso.');
    }
}
