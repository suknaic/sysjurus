<?php

namespace Database\Seeders;

use App\Models\MessageTemplate;
use App\Models\User;
use Illuminate\Database\Seeder;

class MessageTemplateSeeder extends Seeder
{
    public function run(): void
    {
        $users = User::all();

        foreach ($users as $user) {
            $templates = [
                [
                    'name' => 'Lembrete de Vencimento da Parcela',
                    'category' => 'lembrete',
                    'message' => "Olá {{nome_cliente}}, tudo bem?\n\nGostaríamos de lembrar que a parcela {{numero_parcela}} do contrato {{codigo_contrato}} no valor de {{valor_parcela}} vence em {{data_vencimento}}.\n\nCaso já tenha efetuado o pagamento, por favor desconsidere esta mensagem.\n\nCaso ainda não, solicitamos a regularização da situação o mais breve possível.\n\nAguardamos seu retorno!\n\nReceba+ - Gestão Financeira",
                    'is_active' => true,
                    'sort_order' => 0,
                ],
                [
                    'name' => 'Cobranca',
                    'category' => 'cobranca',
                    'message' => "Olá {{nome_cliente}},\n\nIdentificamos que a parcela {{numero_parcela}} do contrato {{codigo_contrato}} no valor de {{valor_parcela}} encontra-se em atraso há {{dias_atraso}} dias (vencimento: {{data_vencimento}}).\n\nValor restante a pagar: {{valor_restante}}\n\nSolicitamos a regularização da situação o mais breve possível para evitar novos encargos.\n\nFicamos à disposição para qualquer dúvida.\n\nReceba+ - Gestão Financeira",
                    'is_active' => true,
                    'sort_order' => 1,
                ],
                [
                    'name' => 'Aviso Final',
                    'category' => 'aviso_final',
                    'message' => "{{nome_cliente}}, ATENÇÃO!\n\nA parcela {{numero_parcela}} do contrato {{codigo_contrato}} está com atraso de {{dias_atraso}} dias.\n\nValor devido: {{valor_restante}}\nVencimento: {{data_vencimento}}\n\nCaso o pagamento não seja regularizado em até 3 dias úteis, estaremos aptos a tomar as providências legais cabíveis, incluindo a aplicação de multa contratual.\n\nRegularize sua situação o mais rápido possível.\n\nReceba+ - Gestão Financeira",
                    'is_active' => true,
                    'sort_order' => 2,
                ],
                [
                    'name' => 'Personalizado',
                    'category' => 'custom',
                    'message' => "Olá {{nome_cliente}}!\n\nEscreva sua mensagem aqui...\n\nVariáveis disponíveis:\n- {{nome_cliente}}\n- {{codigo_contrato}}\n- {{numero_parcela}}\n- {{valor_parcela}}\n- {{valor_restante}}\n- {{data_vencimento}}\n- {{dias_atraso}}\n- {{data_hoje}}",
                    'is_active' => false,
                    'sort_order' => 3,
                ],
            ];

            foreach ($templates as $template) {
                MessageTemplate::create(array_merge($template, [
                    'user_id' => $user->id,
                ]));
            }
        }
    }
}
