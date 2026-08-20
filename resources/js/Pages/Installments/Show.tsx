import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import StatusBadge from '@/Components/StatusBadge';
import WhatsAppSendButton from '@/Components/WhatsAppSendButton';
import EmptyState from '@/Components/EmptyState';
import { Head, Link } from '@inertiajs/react';
import { Installment } from '@/types';

interface Props { installment: Installment; }

function formatCurrency(value: number): string {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
}

function formatDateBR(date: string): string {
    const d = date.split('T')[0];
    const [y, m, day] = d.split('-');
    return `${day}/${m}/${y}`;
}

export default function InstallmentsShow({ installment }: Props) {
    const remaining = installment.amount_due - installment.amount_paid;

    return (
        <AuthenticatedLayout header={<h2 className="text-xl font-bold text-[var(--text-primary)] tracking-tight font-['Montserrat']">Parcela {installment.installment_number}ª</h2>}>
            <Head title={`Receba+ - Parcela ${installment.installment_number}ª`} />

            <div className="mb-6">
                <Link href="/installments" className="inline-flex items-center gap-1.5 text-sm font-medium text-[#C9A84C] hover:text-[#D4AF37] transition-colors">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" /></svg>
                    Voltar para vencimentos
                </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className="card-premium">
                    <p className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-1">Contrato</p>
                    <Link href={`/contracts/${installment.contract?.id}`} className="text-lg font-bold text-[#C9A84C] hover:text-[#D4AF37] transition-colors">
                        {installment.contract?.code}
                    </Link>
                </div>
                <div className="card-premium">
                    <p className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-1">Cliente</p>
                    <p className="text-lg font-bold text-[var(--text-primary)]">{installment.contract?.customer?.name ?? '-'}</p>
                </div>
                <div className="card-premium">
                    <p className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-1">Status</p>
                    <StatusBadge status={installment.status} />
                </div>
                <div className="card-premium">
                    <p className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-1">Dias em Atraso</p>
                    <p className={`text-lg font-bold ${installment.days_overdue > 0 ? 'text-red-400' : 'text-emerald-400'}`}>
                        {installment.days_overdue}
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                <div className="card-premium">
                    <p className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-1">Valor da Parcela</p>
                    <p className="text-2xl font-bold text-[var(--text-primary)]">{formatCurrency(installment.amount_due)}</p>
                </div>
                <div className="card-premium">
                    <p className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-1">Valor Pago</p>
                    <p className="text-2xl font-bold text-emerald-400">{formatCurrency(installment.amount_paid)}</p>
                </div>
                <div className="card-premium">
                    <p className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-1">Valor Restante</p>
                    <p className={`text-2xl font-bold ${remaining > 0 ? 'text-red-400' : 'text-emerald-400'}`}>{formatCurrency(remaining)}</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="card-premium">
                    <h3 className="text-lg font-bold text-[var(--text-primary)] mb-5 font-['Montserrat']">
                        <span className="flex items-center gap-2">
                            <svg className="h-5 w-5 text-[#C9A84C]" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" /></svg>
                            Dados da Parcela
                        </span>
                    </h3>
                    <dl className="space-y-3">
                        {[
                            ['Numero', `${installment.installment_number}ª`],
                            ['Vencimento', formatDateBR(installment.due_date)],
                            ['Data de Pagamento', installment.paid_at ? formatDateBR(installment.paid_at) : '-'],
                        ].map(([label, value]) => (
                            <div key={label} className="flex justify-between items-center py-2 border-b border-[var(--border-subtle)] last:border-0">
                                <dt className="text-sm text-[var(--text-muted)]">{label}</dt>
                                <dd className="text-sm font-semibold text-[var(--text-primary)]">{value}</dd>
                            </div>
                        ))}
                    </dl>
                </div>

                <div className="card-premium">
                    <h3 className="text-lg font-bold text-[var(--text-primary)] mb-5 font-['Montserrat']">
                        <span className="flex items-center gap-2">
                            <svg className="h-5 w-5 text-[#C9A84C]" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            Acoes
                        </span>
                    </h3>
                    <div className="space-y-3">
                        {(installment.status === 'pending' || installment.status === 'overdue' || installment.status === 'partial') && (
                            <WhatsAppSendButton installment={installment} />
                        )}
                        {installment.contract?.customer?.phone && (
                            <a
                                href={`tel:${installment.contract.customer.phone}`}
                                className="btn-secondary w-full"
                            >
                                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" /></svg>
                                Ligar para o Cliente
                            </a>
                        )}
                    </div>
                </div>
            </div>

            {installment.payments && installment.payments.length > 0 && (
                <div className="mt-6 card-premium overflow-hidden">
                    <div className="px-6 py-5 border-b border-[var(--border-subtle)]">
                        <h3 className="text-lg font-bold text-[var(--text-primary)] font-['Montserrat']">Pagamentos</h3>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full table-premium">
                            <thead>
                                <tr>
                                    <th>Data</th>
                                    <th>Valor</th>
                                    <th>Forma</th>
                                    <th>Registrado por</th>
                                    <th>Observacoes</th>
                                </tr>
                            </thead>
                            <tbody>
                                {installment.payments.map((payment) => (
                                    <tr key={payment.id}>
                                        <td className="text-[var(--text-muted)]">{formatDateBR(payment.payment_date)}</td>
                                        <td className="font-semibold text-emerald-400">{formatCurrency(payment.amount)}</td>
                                        <td className="text-[var(--text-muted)] capitalize">{payment.payment_method ?? '-'}</td>
                                        <td className="text-[var(--text-muted)]">{payment.user?.name ?? '-'}</td>
                                        <td className="text-[var(--text-muted)] max-w-xs truncate">{payment.notes || payment.reference || '-'}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {(!installment.payments || installment.payments.length === 0) && (
                <div className="mt-6">
                    <EmptyState title="Nenhum pagamento registrado" description="Registre um pagamento na lista de vencimentos." />
                </div>
            )}
        </AuthenticatedLayout>
    );
}
