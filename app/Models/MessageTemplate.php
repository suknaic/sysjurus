<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class MessageTemplate extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'name',
        'category',
        'message',
        'is_active',
        'sort_order',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'sort_order' => 'integer',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function render(array $vars): string
    {
        $replacements = [
            '{{nome_cliente}}' => $vars['nome_cliente'] ?? '',
            '{{codigo_contrato}}' => $vars['codigo_contrato'] ?? '',
            '{{numero_parcela}}' => $vars['numero_parcela'] ?? '',
            '{{valor_parcela}}' => $vars['valor_parcela'] ?? '',
            '{{valor_pago}}' => $vars['valor_pago'] ?? '',
            '{{valor_restante}}' => $vars['valor_restante'] ?? '',
            '{{data_vencimento}}' => $vars['data_vencimento'] ?? '',
            '{{dias_atraso}}' => $vars['dias_atraso'] ?? '',
            '{{data_hoje}}' => $vars['data_hoje'] ?? '',
            '{{telefone_cliente}}' => $vars['telefone_cliente'] ?? '',
        ];

        return str_replace(array_keys($replacements), array_values($replacements), $this->message);
    }
}
