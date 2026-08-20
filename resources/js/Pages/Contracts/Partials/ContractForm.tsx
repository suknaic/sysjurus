import { useForm } from '@inertiajs/react';
import { Contract, Customer } from '@/types';

interface Props { contract?: Contract; customers: Customer[]; }

export default function ContractForm({ contract, customers }: Props) {
    const { data, setData, post, put, processing, errors } = useForm({
        customer_id: contract?.customer_id || '',
        description: contract?.description || '',
        amount: contract?.amount || '',
        interest_rate: contract?.interest_rate || 0,
        fine_amount: contract?.fine_amount || 0,
        payment_frequency: contract?.payment_frequency || 'monthly',
        first_payment_date: contract?.first_payment_date?.split('T')[0] || '',
        total_installments: contract?.total_installments || 12,
        status: contract?.status || 'active',
        notes: contract?.notes || '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (contract) {
            put(`/contracts/${contract.id}`);
        } else {
            post('/contracts');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="card-premium">
                <h3 className="text-lg font-bold text-[var(--text-primary)] mb-5 font-['Montserrat']">
                    <span className="flex items-center gap-2">
                        <svg className="h-5 w-5 text-[#C9A84C]" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg>
                        Dados do Contrato
                    </span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div>
                        <label className="block text-sm font-semibold text-[var(--text-secondary)] mb-1.5">Cliente *</label>
                        <select value={data.customer_id} onChange={(e) => setData('customer_id', Number(e.target.value))} className="select-premium" required>
                            <option value="">Selecione um cliente</option>
                            {customers.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                        </select>
                        {errors.customer_id && <p className="mt-1.5 text-sm text-red-400 font-medium">{errors.customer_id}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-[var(--text-secondary)] mb-1.5">Valor (R$) *</label>
                        <input type="number" step="0.01" value={data.amount} onChange={(e) => setData('amount', e.target.value)} className="input-premium" required />
                        {errors.amount && <p className="mt-1.5 text-sm text-red-400 font-medium">{errors.amount}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-[var(--text-secondary)] mb-1.5">Total de Parcelas *</label>
                        <input type="number" value={data.total_installments} onChange={(e) => setData('total_installments', Number(e.target.value))} className="input-premium" required min="1" />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-[var(--text-secondary)] mb-1.5">Frequencia *</label>
                        <select value={data.payment_frequency} onChange={(e) => setData('payment_frequency', e.target.value)} className="select-premium" required>
                            <option value="weekly">Semanal</option>
                            <option value="biweekly">Quinzenal</option>
                            <option value="monthly">Mensal</option>
                            <option value="quarterly">Trimestral</option>
                            <option value="semiannually">Semestral</option>
                            <option value="annually">Anual</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-[var(--text-secondary)] mb-1.5">1º Pagamento *</label>
                        <input type="date" value={data.first_payment_date} onChange={(e) => setData('first_payment_date', e.target.value)} className="input-premium" required />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-[var(--text-secondary)] mb-1.5">Juros (%)</label>
                        <input type="number" step="0.01" value={data.interest_rate} onChange={(e) => setData('interest_rate', Number(e.target.value))} className="input-premium" />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-[var(--text-secondary)] mb-1.5">Multa (R$)</label>
                        <input type="number" step="0.01" value={data.fine_amount} onChange={(e) => setData('fine_amount', Number(e.target.value))} className="input-premium" />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-[var(--text-secondary)] mb-1.5">Descricao</label>
                        <input type="text" value={data.description} onChange={(e) => setData('description', e.target.value)} className="input-premium" />
                    </div>
                    <div className="md:col-span-2 lg:col-span-3">
                        <label className="block text-sm font-semibold text-[var(--text-secondary)] mb-1.5">Observacao</label>
                        <textarea value={data.notes} onChange={(e) => setData('notes', e.target.value)} rows={3} className="input-premium" />
                    </div>
                </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-end gap-3">
                <a href="/contracts" className="btn-secondary">Cancelar</a>
                <button type="submit" disabled={processing} className="btn-primary disabled:opacity-50">
                    {processing ? 'Salvando...' : contract ? 'Atualizar' : 'Salvar'}
                </button>
            </div>
        </form>
    );
}
