<?php

namespace App\Http\Controllers;

use App\Models\SalaryRecord;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SalaryController extends Controller
{
    public function index(Request $request)
    {
        $records = SalaryRecord::where('user_id', $request->user()->id)
            ->when($request->status, fn ($q, $s) => $q->where('status', $s))
            ->when($request->search, fn ($q, $s) => $q->where('title', 'like', "%{$s}%")->orWhere('person_name', 'like', "%{$s}%"))
            ->orderByDesc('due_date')
            ->paginate(15)
            ->withQueryString();

        $metrics = [
            'to_receive' => SalaryRecord::where('user_id', $request->user()->id)->where('status', 'pending')->sum('amount'),
            'today' => SalaryRecord::where('user_id', $request->user()->id)->where('status', 'pending')->whereDate('due_date', today())->sum('amount'),
            'overdue' => SalaryRecord::where('user_id', $request->user()->id)->where('status', 'pending')->where('due_date', '<', today())->sum('amount'),
            'received' => SalaryRecord::where('user_id', $request->user()->id)->where('status', 'received')->sum('amount'),
        ];

        return Inertia::render('Salaries/Index', [
            'records' => $records,
            'metrics' => $metrics,
            'filters' => $request->only('status', 'search'),
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'person_name' => 'nullable|string|max:255',
            'amount' => 'required|numeric|min:0',
            'due_date' => 'required|date',
            'category' => 'nullable|string|max:100',
            'notes' => 'nullable|string',
        ]);

        SalaryRecord::create(array_merge(
            $request->only(['title', 'person_name', 'amount', 'due_date', 'category', 'notes']),
            [
                'user_id' => $request->user()->id,
                'status' => 'pending',
            ]
        ));

        return back()->with('success', 'Lançamento criado com sucesso.');
    }

    public function update(Request $request, SalaryRecord $record)
    {
        $record->update($request->only(['status', 'received_at']));

        return back()->with('success', 'Registro atualizado com sucesso.');
    }

    public function destroy(SalaryRecord $record)
    {
        $record->delete();

        return back()->with('success', 'Registro removido com sucesso.');
    }
}
