import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import StatusBadge from '@/Components/StatusBadge';
import WhatsAppSendButton from '@/Components/WhatsAppSendButton';
import { Head, Link } from '@inertiajs/react';
import { Contract } from '@/types';

interface Props { contract: Contract; }

function formatCurrency(value: number): string {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
}

function formatDate(date: string): string {
    const d = date.split('T')[0];
    const [y, m, day] = d.split('-');
    return `${day}/${m}/${y}`;
}

export default function ContractsShow({ contract }: Props) {
    return (
        <AuthenticatedLayout header={<h2 className="text-xl font-bold text-[var(--text-primary)] tracking-tight font-['Montserrat']">Contrato {contract.code}</h2>}>
            <Head title={`Receba+ - ${contract.code}`} />

            <div className="mb-6">
                <Link href="/contracts" className="inline-flex items-center gap-1.5 text-sm font-medium text-[#C9A84C] hover:text-[#D4AF37] transition-colors">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" /></svg>
                    Voltar para contratos
                </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                <div className="card-premium">
                    <p className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-1">Cliente</p>
                    <p className="text-lg font-bold text-[var(--text-primary)]">{contract.customer?.name}</p>
                </div>
                <div className="card-premium">
                    <p className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-1">Valor Total</p>
                    <p className="text-lg font-bold text-[#C9A84C]">{formatCurrency(contract.amount)}</p>
                </div>
                <div className="card-premium">
                    <p className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-1">Status</p>
                    <StatusBadge status={contract.status} />
                </div>
            </div>

            <div className="card-premium mb-6">
                <h3 className="text-lg font-bold text-[var(--text-primary)] mb-5 font-['Montserrat']">
                    <span className="flex items-center gap-2">
                        <svg className="h-5 w-5 text-[#C9A84C]" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" /></svg>
                        Detalhes
                    </span>
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                    {[
                        ['Frequencia', contract.payment_frequency],
                        ['Parcelas', `${contract.total_installments}x`],
                        ['1º Pagamento', formatDate(contract.first_payment_date)],
                        ['Juros', `${contract.interest_rate}%`],
                        ['Multa', formatCurrency(contract.fine_amount)],
                    ].map(([label, value]) => (
                        <div key={label as string} className="p-3 rounded-xl bg-[var(--bg-input)] border border-[var(--border-subtle)]">
                            <p className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-1">{label}</p>
                            <p className="text-sm font-bold text-[var(--text-primary)]">{value}</p>
                        </div>
                    ))}
                </div>
            </div>

            {contract.installments && contract.installments.length > 0 && (
                <div className="card-premium overflow-hidden">
                    <div className="px-6 py-5 border-b border-[var(--border-subtle)]">
                        <h3 className="text-lg font-bold text-[var(--text-primary)] font-['Montserrat']">Parcelas</h3>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full table-premium">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Vencimento</th>
                                    <th>Valor</th>
                                    <th>Pago</th>
                                    <th>Status</th>
                                    <th>Acoes</th>
                                </tr>
                            </thead>
                            <tbody>
                                {contract.installments.map((inst) => (
                                    <tr key={inst.id}>
                                        <td className="font-medium text-[var(--text-primary)]">{inst.installment_number}ª</td>
                                        <td className="text-[var(--text-muted)]">{formatDate(inst.due_date)}</td>
                                        <td className="font-semibold text-[var(--text-primary)]">{formatCurrency(inst.amount_due)}</td>
                                        <td className="text-[var(--text-muted)]">{formatCurrency(inst.amount_paid)}</td>
                                        <td><StatusBadge status={inst.status} /></td>
                                        <td>
                                            <div className="flex items-center gap-2">
                                                {(inst.status === 'pending' || inst.status === 'overdue' || inst.status === 'partial') && (
                                                    <WhatsAppSendButton installment={inst} />
                                                )}
                                                <Link href={`/installments/${inst.id}`} className="text-[#C9A84C] hover:text-[#D4AF37] font-semibold text-sm transition-colors">
                                                    Detalhes
                                                </Link>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}
