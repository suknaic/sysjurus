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
                    'name' => 'Lembrete Amigavel',
                    'category' => 'lembrete',
                    'message' => "Ola {{nome_cliente}}, tudo bem?\n\nEsse e um lembrete de que a parcela {{numero_parcela}} do contrato {{codigo_contrato}} no valor de {{valor_parcela}} venceu em {{data_vencimento}}.\n\nCaso ja tenha efetuado o pagamento, por favor desconside esta mensagem.\n\nCaso ainda nao, segue o link para pagamento:\n\nAguardamos seu retorno!\n\nSysJuros - Gestao Financeira",
                    'is_active' => true,
                    'sort_order' => 0,
                ],
                [
                    'name' => 'Cobranca',
                    'category' => 'cobranca',
                    'message' => "Olá {{nome_cliente}},\n\nIdentificamos que a parcela {{numero_parcela}} do contrato {{codigo_contrato}} no valor de {{valor_parcela}} encontra-se em atraso ha {{dias_atraso}} dias (vencimento: {{data_vencimento}}).\n\nValor restante a pagar: {{valor_restante}}\n\nSolicitamos a regularizacao da situacao o mais breve possivel para evitar novos encargos.\n\nFicamos a disposicao para qualquer duvida.\n\nSysJuros - Gestao Financeira",
                    'is_active' => true,
                    'sort_order' => 1,
                ],
                [
                    'name' => 'Aviso Final',
                    'category' => 'aviso_final',
                    'message' => "{{nome_cliente}}, ATENCAO!\n\nA parcela {{numero_parcela}} do contrato {{codigo_contrato}} esta com atraso de {{dias_atraso}} dias.\n\nValor devido: {{valor_restante}}\nVencimento: {{data_vencimento}}\n\nCaso o pagamento nao seja regularizado em ate 3 dias uteis, estaremos aptos a tomar as providencias legais cabiveis, incluindo a aplicacao de multa contratual.\n\nRegularize sua situacao o mais rapido possivel.\n\nSysJuros - Gestao Financeira",
                    'is_active' => true,
                    'sort_order' => 2,
                ],
                [
                    'name' => 'Personalizado',
                    'category' => 'custom',
                    'message' => "Ola {{nome_cliente}}!\n\nEscreva sua mensagem aqui...\n\nVariaveis disponiveis:\n- {{nome_cliente}}\n- {{codigo_contrato}}\n- {{numero_parcela}}\n- {{valor_parcela}}\n- {{valor_restante}}\n- {{data_vencimento}}\n- {{dias_atraso}}\n- {{data_hoje}}",
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
