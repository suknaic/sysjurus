<?php

namespace App\Http\Controllers;

use App\Models\Installment;
use App\Models\MessageTemplate;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class MessageTemplateController extends Controller
{
    public function index(Request $request): Response
    {
        $templates = MessageTemplate::where('user_id', $request->user()->id)
            ->orderBy('sort_order')
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('Messages/Index', [
            'templates' => $templates,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'category' => 'required|in:lembrete,cobranca,aviso_final,custom',
            'message' => 'required|string|max:2000',
        ]);

        $validated['user_id'] = $request->user()->id;
        $validated['sort_order'] = MessageTemplate::where('user_id', $request->user()->id)->count();

        MessageTemplate::create($validated);

        return back()->with('success', 'Template criado com sucesso.');
    }

    public function update(Request $request, MessageTemplate $messageTemplate): RedirectResponse
    {
        if ($messageTemplate->user_id !== $request->user()->id) {
            abort(403);
        }

        $validated = $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'category' => 'sometimes|required|in:lembrete,cobranca,aviso_final,custom',
            'message' => 'sometimes|required|string|max:2000',
            'is_active' => 'sometimes|boolean',
            'sort_order' => 'sometimes|integer',
        ]);

        $messageTemplate->update($validated);

        return back()->with('success', 'Template atualizado com sucesso.');
    }

    public function destroy(Request $request, MessageTemplate $messageTemplate): RedirectResponse
    {
        if ($messageTemplate->user_id !== $request->user()->id) {
            abort(403);
        }

        if ($messageTemplate->category !== 'custom') {
            return back()->withErrors(['error' => 'Templates padrão não podem ser removidos.']);
        }

        $messageTemplate->delete();

        return back()->with('success', 'Template removido com sucesso.');
    }

    public function preview(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'message' => 'required|string',
            'installment_id' => 'required|exists:installments,id',
        ]);

        $installment = Installment::with('contract.customer')
            ->findOrFail($validated['installment_id']);

        $customer = $installment->contract->customer;
        $contract = $installment->contract;

        $vars = [
            'nome_cliente' => $customer->name,
            'codigo_contrato' => $contract->code,
            'numero_parcela' => $installment->installment_number.'ª',
            'valor_parcela' => 'R$ '.number_format((float) $installment->amount_due, 2, ',', '.'),
            'valor_pago' => 'R$ '.number_format((float) $installment->amount_paid, 2, ',', '.'),
            'valor_restante' => 'R$ '.number_format((float) ($installment->amount_due - $installment->amount_paid), 2, ',', '.'),
            'data_vencimento' => Carbon::parse($installment->due_date)->format('d/m/Y'),
            'dias_atraso' => max(0, Carbon::parse($installment->due_date)->diffInDays(now())),
            'data_hoje' => now()->format('d/m/Y'),
            'telefone_cliente' => $customer->phone ?? '',
        ];

        $rendered = str_replace(
            array_map(fn ($k) => '{{'.$k.'}}', array_keys($vars)),
            array_values($vars),
            $validated['message']
        );

        return response()->json(['preview' => $rendered]);
    }

    public function list(Request $request): JsonResponse
    {
        $templates = MessageTemplate::where('user_id', $request->user()->id)
            ->where('is_active', true)
            ->orderBy('sort_order')
            ->get();

        return response()->json($templates);
    }
}
