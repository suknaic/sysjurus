import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PageHeader from '@/Components/PageHeader';
import Pagination from '@/Components/Pagination';
import EmptyState from '@/Components/EmptyState';
import StatusBadge from '@/Components/StatusBadge';
import StatsCard from '@/Components/StatsCard';
import FlashMessage from '@/Components/FlashMessage';
import Modal from '@/Components/Modal';
import WhatsAppSendButton from '@/Components/WhatsAppSendButton';
import { Head, router } from '@inertiajs/react';
import { PageProps, Installment, PaginatedData } from '@/types';
import { useState } from 'react';

interface Props extends PageProps {
    installments: PaginatedData<Installment>;
    metrics: { total_pending: number; total_overdue: number; total_paid: number };
    filters: { status?: string };
}

function formatCurrency(value: number): string {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
}

function formatDate(date: string): string {
    const d = date.split('T')[0];
    const [y, m, day] = d.split('-');
    return `${day}/${m}/${y}`;
}

export default function InstallmentsIndex({ installments, metrics, filters }: Props) {
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [selectedInstallment, setSelectedInstallment] = useState<Installment | null>(null);
    const [paymentData, setPaymentData] = useState({ amount: '', payment_method: 'pix', payment_date: new Date().toISOString().split('T')[0] });

    const handleFilter = (status: string) => {
        router.get('/installments', { status }, { preserveState: true });
    };

    const openPayment = (inst: Installment) => {
        setSelectedInstallment(inst);
        setPaymentData({
            amount: String(inst.amount_due - inst.amount_paid),
            payment_method: 'pix',
            payment_date: new Date().toISOString().split('T')[0],
        });
        setShowPaymentModal(true);
    };

    const submitPayment = () => {
        if (!selectedInstallment) return;
        router.put(`/installments/${selectedInstallment.id}`, {
            ...paymentData,
            amount: parseFloat(paymentData.amount),
        }, {
            onSuccess: () => {
                setShowPaymentModal(false);
                setSelectedInstallment(null);
            },
        });
    };

    return (
        <AuthenticatedLayout header={<h2 className="text-xl font-bold text-[var(--text-primary)] tracking-tight font-['Montserrat']">Vencimentos</h2>}>
            <Head title="Receba+ - Vencimentos" />
            <FlashMessage />

            <PageHeader title="Vencimentos" />

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-3 mb-8">
                <div onClick={() => handleFilter('pending')} className="cursor-pointer">
                    <StatsCard title="A Receber" value={formatCurrency(metrics.total_pending)} icon={<svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>} color="blue" />
                </div>
                <div onClick={() => handleFilter('overdue')} className="cursor-pointer">
                    <StatsCard title="Atrasadas" value={formatCurrency(metrics.total_overdue)} icon={<svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" /></svg>} color="red" />
                </div>
                <div onClick={() => handleFilter('paid')} className="cursor-pointer">
                    <StatsCard title="Recebidas" value={formatCurrency(metrics.total_paid)} icon={<svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>} color="green" />
                </div>
            </div>

            <div className="card-premium overflow-hidden">
                <div className="px-5 py-3 bg-[var(--bg-table-header)] border-b border-[var(--border-subtle)] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                    <p className="text-sm text-[var(--text-muted)]">{installments.total} parcela(s)</p>
                    <div className="flex flex-wrap gap-2">
                        <button onClick={() => handleFilter('')} className={`text-xs px-3.5 py-1.5 rounded-lg font-semibold transition-all duration-300 ${!filters.status ? 'gradient-gold text-black shadow-md shadow-amber-500/25' : 'bg-[var(--bg-input)] text-[var(--text-muted)] hover:bg-[var(--bg-input-focus)] border border-[var(--border-subtle)]'}`}>Todas</button>
                        <button onClick={() => handleFilter('pending')} className={`text-xs px-3.5 py-1.5 rounded-lg font-semibold transition-all duration-300 ${filters.status === 'pending' ? 'bg-amber-500 text-black shadow-md shadow-amber-500/25' : 'bg-[var(--bg-input)] text-[var(--text-muted)] hover:bg-[var(--bg-input-focus)] border border-[var(--border-subtle)]'}`}>Pendentes</button>
                        <button onClick={() => handleFilter('overdue')} className={`text-xs px-3.5 py-1.5 rounded-lg font-semibold transition-all duration-300 ${filters.status === 'overdue' ? 'bg-red-500 text-white shadow-md shadow-red-500/25' : 'bg-[var(--bg-input)] text-[var(--text-muted)] hover:bg-[var(--bg-input-focus)] border border-[var(--border-subtle)]'}`}>Atrasadas</button>
                        <button onClick={() => handleFilter('paid')} className={`text-xs px-3.5 py-1.5 rounded-lg font-semibold transition-all duration-300 ${filters.status === 'paid' ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/25' : 'bg-[var(--bg-input)] text-[var(--text-muted)] hover:bg-[var(--bg-input-focus)] border border-[var(--border-subtle)]'}`}>Pagas</button>
                    </div>
                </div>
                {installments.data.length === 0 ? (
                    <EmptyState title="Nenhuma parcela encontrada" description="Ajuste os filtros ou cadastre novos contratos." />
                ) : (
                    <>
                        <div className="overflow-x-auto">
                            <table className="w-full table-premium">
                                <thead>
                                    <tr>
                                        <th>Cliente</th>
                                        <th className="hidden sm:table-cell">Contrato</th>
                                        <th>Parcela</th>
                                        <th className="hidden md:table-cell">Vencimento</th>
                                        <th>Valor</th>
                                        <th>Status</th>
                                        <th className="text-right">Acoes</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {installments.data.map((inst) => (
                                        <tr key={inst.id}>
                                            <td className="font-semibold text-[#C9A84C]">
                                                {inst.contract?.customer?.name}
                                                <span className="sm:hidden text-xs text-[var(--text-faint)] block">{inst.contract?.code}</span>
                                            </td>
                                            <td className="hidden sm:table-cell font-semibold text-[#C9A84C]">{inst.contract?.code}</td>
                                            <td className="text-[var(--text-muted)]">{inst.installment_number}ª</td>
                                            <td className="hidden md:table-cell text-[var(--text-muted)]">{formatDate(inst.due_date)}</td>
                                            <td className="font-semibold text-[var(--text-primary)]">{formatCurrency(inst.amount_due)}</td>
                                            <td><StatusBadge status={inst.status} /></td>
                                            <td className="text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    {(inst.status === 'pending' || inst.status === 'overdue' || inst.status === 'partial') && (
                                                        <>
                                                            <WhatsAppSendButton installment={inst} />
                                                            <button onClick={() => openPayment(inst)} className="btn-success text-xs !px-3 !py-1.5">
                                                                Receber
                                                            </button>
                                                        </>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <Pagination data={installments} />
                    </>
                )}
            </div>

            <Modal show={showPaymentModal} onClose={() => setShowPaymentModal(false)} title="Registrar Pagamento">
                <div className="space-y-4">
                    {selectedInstallment && (
                        <div className="rounded-xl bg-[var(--bg-input)] p-4 border border-[var(--border-subtle)]">
                            <div className="grid grid-cols-2 gap-3 text-sm">
                                <div>
                                    <p className="text-[var(--text-muted)] text-xs font-semibold">Contrato</p>
                                    <p className="font-bold text-[var(--text-primary)]">{selectedInstallment.contract?.code}</p>
                                </div>
                                <div>
                                    <p className="text-[var(--text-muted)] text-xs font-semibold">Parcela</p>
                                    <p className="font-bold text-[var(--text-primary)]">{selectedInstallment.installment_number}ª</p>
                                </div>
                                <div>
                                    <p className="text-[var(--text-muted)] text-xs font-semibold">Valor Devido</p>
                                    <p className="font-bold text-[var(--text-primary)]">{formatCurrency(selectedInstallment.amount_due)}</p>
                                </div>
                                <div>
                                    <p className="text-[var(--text-muted)] text-xs font-semibold">Restante</p>
                                    <p className="font-bold text-[#C9A84C]">{formatCurrency(selectedInstallment.amount_due - selectedInstallment.amount_paid)}</p>
                                </div>
                            </div>
                        </div>
                    )}
                    <div>
                        <label className="block text-sm font-semibold text-[var(--text-secondary)] mb-1.5">Valor (R$)</label>
                        <input type="number" step="0.01" value={paymentData.amount} onChange={(e) => setPaymentData({ ...paymentData, amount: e.target.value })} className="input-premium" />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-[var(--text-secondary)] mb-1.5">Data</label>
                        <input type="date" value={paymentData.payment_date} onChange={(e) => setPaymentData({ ...paymentData, payment_date: e.target.value })} className="input-premium" />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-[var(--text-secondary)] mb-1.5">Forma de Pagamento</label>
                        <select value={paymentData.payment_method} onChange={(e) => setPaymentData({ ...paymentData, payment_method: e.target.value })} className="select-premium">
                            <option value="pix">PIX</option>
                            <option value="boleto">Boleto</option>
                            <option value="transfer">Transferencia</option>
                            <option value="cash">Dinheiro</option>
                            <option value="card">Cartao</option>
                        </select>
                    </div>
                    <div className="flex justify-end gap-3 pt-4 border-t border-[var(--border-subtle)]">
                        <button onClick={() => setShowPaymentModal(false)} className="btn-secondary">Cancelar</button>
                        <button onClick={submitPayment} className="btn-success">Confirmar Pagamento</button>
                    </div>
                </div>
            </Modal>
        </AuthenticatedLayout>
    );
}
