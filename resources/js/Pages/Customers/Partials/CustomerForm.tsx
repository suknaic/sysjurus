import { useForm } from '@inertiajs/react';
import { Customer } from '@/types';

interface Props { customer?: Customer; }

const states = ['AC','AL','AP','AM','BA','CE','DF','ES','GO','MA','MT','MS','MG','PA','PB','PR','PE','PI','RJ','RN','RS','RO','RR','SC','SP','SE','TO'];

export default function CustomerForm({ customer }: Props) {
    const { data, setData, post, put, processing, errors } = useForm({
        name: customer?.name || '',
        email: customer?.email || '',
        phone: customer?.phone || '',
        phone_is_international: customer?.phone_is_international || false,
        birth_date: customer?.birth_date?.split('T')[0] || '',
        document_type: customer?.document_type || 'cpf',
        document_number: customer?.document_number || '',
        rg: customer?.rg || '',
        zip_code: customer?.zip_code || '',
        address: customer?.address || '',
        number: customer?.number || '',
        complement: customer?.complement || '',
        district: customer?.district || '',
        city: customer?.city || '',
        state: customer?.state || '',
        notes: customer?.notes || '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (customer) {
            put(`/customers/${customer.id}`);
        } else {
            post('/customers');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="card-premium">
                <h3 className="text-lg font-bold text-[var(--text-primary)] mb-5 font-['Montserrat']">
                    <span className="flex items-center gap-2">
                        <svg className="h-5 w-5 text-[#C9A84C]" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" /></svg>
                        Identificacao
                    </span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="md:col-span-2 lg:col-span-3">
                        <label className="block text-sm font-semibold text-[var(--text-secondary)] mb-1.5">Nome *</label>
                        <input type="text" value={data.name} onChange={(e) => setData('name', e.target.value)} className="input-premium" required />
                        {errors.name && <p className="mt-1.5 text-sm text-red-400 font-medium">{errors.name}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-[var(--text-secondary)] mb-1.5">Email</label>
                        <input type="email" value={data.email} onChange={(e) => setData('email', e.target.value)} className="input-premium" />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-[var(--text-secondary)] mb-1.5">Telefone</label>
                        <input type="text" value={data.phone} onChange={(e) => setData('phone', e.target.value)} className="input-premium" />
                    </div>
                    <div className="flex items-end gap-2">
                        <input type="checkbox" checked={data.phone_is_international} onChange={(e) => setData('phone_is_international', e.target.checked)} className="h-4 w-4 rounded border-white/20 text-[#C9A84C] focus:ring-[#C9A84C]/50 bg-white/5" id="intl" />
                        <label htmlFor="intl" className="text-sm text-[var(--text-secondary)] pb-1">Internacional</label>
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-[var(--text-secondary)] mb-1.5">Nascimento</label>
                        <input type="date" value={data.birth_date} onChange={(e) => setData('birth_date', e.target.value)} className="input-premium" />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-[var(--text-secondary)] mb-1.5">Tipo de Documento</label>
                        <select value={data.document_type} onChange={(e) => setData('document_type', e.target.value)} className="select-premium">
                            <option value="cpf">CPF</option>
                            <option value="cnpj">CNPJ</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-[var(--text-secondary)] mb-1.5">CPF/CNPJ</label>
                        <input type="text" value={data.document_number} onChange={(e) => setData('document_number', e.target.value)} className="input-premium" />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-[var(--text-secondary)] mb-1.5">RG</label>
                        <input type="text" value={data.rg} onChange={(e) => setData('rg', e.target.value)} className="input-premium" />
                    </div>
                </div>
            </div>

            <div className="card-premium">
                <h3 className="text-lg font-bold text-[var(--text-primary)] mb-5 font-['Montserrat']">
                    <span className="flex items-center gap-2">
                        <svg className="h-5 w-5 text-[#C9A84C]" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" /></svg>
                        Endereco
                    </span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div>
                        <label className="block text-sm font-semibold text-[var(--text-secondary)] mb-1.5">CEP</label>
                        <input type="text" value={data.zip_code} onChange={(e) => setData('zip_code', e.target.value)} className="input-premium" />
                    </div>
                    <div className="lg:col-span-2">
                        <label className="block text-sm font-semibold text-[var(--text-secondary)] mb-1.5">Endereco</label>
                        <input type="text" value={data.address} onChange={(e) => setData('address', e.target.value)} className="input-premium" />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-[var(--text-secondary)] mb-1.5">Numero</label>
                        <input type="text" value={data.number} onChange={(e) => setData('number', e.target.value)} className="input-premium" />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-[var(--text-secondary)] mb-1.5">Complemento</label>
                        <input type="text" value={data.complement} onChange={(e) => setData('complement', e.target.value)} className="input-premium" />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-[var(--text-secondary)] mb-1.5">Bairro</label>
                        <input type="text" value={data.district} onChange={(e) => setData('district', e.target.value)} className="input-premium" />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-[var(--text-secondary)] mb-1.5">Cidade</label>
                        <input type="text" value={data.city} onChange={(e) => setData('city', e.target.value)} className="input-premium" />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-[var(--text-secondary)] mb-1.5">UF</label>
                        <select value={data.state} onChange={(e) => setData('state', e.target.value)} className="select-premium">
                            <option value="">Selecione</option>
                            {states.map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                    </div>
                    <div className="lg:col-span-2">
                        <label className="block text-sm font-semibold text-[var(--text-secondary)] mb-1.5">Observacoes</label>
                        <textarea value={data.notes} onChange={(e) => setData('notes', e.target.value)} rows={2} className="input-premium" />
                    </div>
                </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-end gap-3">
                <a href="/customers" className="btn-secondary">Cancelar</a>
                <button type="submit" disabled={processing} className="btn-primary disabled:opacity-50">
                    {processing ? 'Salvando...' : customer ? 'Atualizar' : 'Cadastrar'}
                </button>
            </div>
        </form>
    );
}
