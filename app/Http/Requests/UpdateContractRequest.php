<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateContractRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'description' => ['nullable', 'string', 'max:255'],
            'amount' => ['required', 'numeric', 'min:0.01'],
            'interest_rate' => ['nullable', 'numeric', 'min:0', 'max:100'],
            'fine_amount' => ['nullable', 'numeric', 'min:0'],
            'payment_frequency' => ['required', 'in:weekly,biweekly,monthly,quarterly,semiannually,annually'],
            'total_installments' => ['required', 'integer', 'min:1', 'max:600'],
            'status' => ['nullable', 'in:active,cancelled,completed'],
            'notes' => ['nullable', 'string'],
        ];
    }
}
