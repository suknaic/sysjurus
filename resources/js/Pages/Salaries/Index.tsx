import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PageHeader from '@/Components/PageHeader';
import Pagination from '@/Components/Pagination';
import EmptyState from '@/Components/EmptyState';
import StatusBadge from '@/Components/StatusBadge';
import StatsCard from '@/Components/StatsCard';
import FlashMessage from '@/Components/FlashMessage';
import Modal from '@/Components/Modal';
import ConfirmDialog from '@/Components/ConfirmDialog';
import { Head, router } from '@inertiajs/react';
import { PageProps, SalaryRecord, PaginatedData } from '@/types';
import { useState } from 'react';

interface Props extends PageProps {
    records: PaginatedData<SalaryRecord>;
    metrics: { to_receive: number; today: number; overdue: number; received: number };
    filters: { status?: string; search?: string };
}

function formatCurrency(value: number): string {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
}

function formatDate(date: string): string {
    return new Date(date).toLocaleDateString('pt-BR');
}

export default function SalariesIndex({ records, metrics, filters }: Props) {
    const [showModal, setShowModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteId, setDeleteId] = useState<number | null>(null);
    const [search, setSearch] = useState(filters.search || '');
    const [form, setForm] = useState({ title: '', person_name: '', amount: '', due_date: '', category: '', notes: '' });

    const handleFilter = (status: string) => {
        router.get('/salaries', { status, search }, { preserveState: true });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        router.post('/salaries', { ...form, amount: parseFloat(form.amount) }, {
            onSuccess: () => { setShowModal(false); setForm({ title: '', person_name: '', amount: '', due_date: '', category: '', notes: '' }); },
        });
    };

    const handleReceive = (id: number) => {
        router.put(`/salaries/${id}`, { status: 'received', received_at: new Date().toISOString() });
    };

    const confirmDelete = () => {
        if (deleteId !== null) {
            router.delete(`/salaries/${deleteId}`);
        }
        setShowDeleteModal(false);
        setDeleteId(null);
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get('/salaries', { status: filters.status, search }, { preserveState: true });
    };

    return (
        <AuthenticatedLayout header={<h2 className="text-xl font-bold text-[var(--text-primary)] tracking-tight font-['Montserrat']">Salarios</h2>}>
            <Head title="Receba+ - Salarios" />
            <FlashMessage />

            <PageHeader title="Salarios">
                <button onClick={() => setShowModal(true)} className="btn-primary">
                    <svg className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
                    Novo Lancamento
                </button>
            </PageHeader>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
                <div className="cursor-pointer" onClick={() => handleFilter('pending')}>
                    <StatsCard title="A Receber" value={formatCurrency(metrics.to_receive)} icon={<svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>} color="blue" />
                </div>
                <div className="cursor-pointer" onClick={() => handleFilter('pending')}>
                    <StatsCard title="Hoje" value={formatCurrency(metrics.today)} icon={<svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" /></svg>} color="yellow" />
                </div>
                <div className="cursor-pointer" onClick={() => handleFilter('overdue')}>
                    <StatsCard title="Atrasadas" value={formatCurrency(metrics.overdue)} icon={<svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" /></svg>} color="red" />
                </div>
                <div className="cursor-pointer" onClick={() => handleFilter('received')}>
                    <StatsCard title="Recebidas" value={formatCurrency(metrics.received)} icon={<svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>} color="green" />
                </div>
            </div>

            <form onSubmit={handleSearch} className="mb-6 flex gap-3">
                <div className="relative flex-1">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                        <svg className="h-4 w-4 text-[var(--text-faint)]" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" /></svg>
                    </div>
                    <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Buscar..." className="input-premium pl-10" />
                </div>
                <button type="submit" className="btn-secondary">
                    <svg className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" /></svg>
                    Buscar
                </button>
            </form>

            <div className="card-premium overflow-hidden">
                {records.data.length === 0 ? (
                    <EmptyState title="Nenhum lancamento" description="Crie um novo lancamento financeiro." />
                ) : (
                    <>
                        <div className="overflow-x-auto">
                            <table className="w-full table-premium">
                                <thead>
                                    <tr>
                                        <th>Titulo</th>
                                        <th className="hidden sm:table-cell">Pessoa</th>
                                        <th>Valor</th>
                                        <th className="hidden md:table-cell">Vencimento</th>
                                        <th className="hidden lg:table-cell">Categoria</th>
                                        <th>Status</th>
                                        <th className="text-right">Acoes</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {records.data.map((record) => (
                                        <tr key={record.id}>
                                            <td className="font-semibold text-[var(--text-primary)]">{record.title}</td>
                                            <td className="hidden sm:table-cell text-[var(--text-muted)]">{record.person_name || '-'}</td>
                                            <td className="font-semibold text-[var(--text-primary)]">{formatCurrency(record.amount)}</td>
                                            <td className="hidden md:table-cell text-[var(--text-muted)]">{formatDate(record.due_date)}</td>
                                            <td className="hidden lg:table-cell text-[var(--text-muted)]">{record.category || '-'}</td>
                                            <td><StatusBadge status={record.status} /></td>
                                            <td className="text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    {record.status !== 'received' && (
                                                        <button onClick={() => handleReceive(record.id)} className="btn-success text-xs !px-3 !py-1.5">
                                                            Receber
                                                        </button>
                                                    )}
                                                    <button onClick={() => { setDeleteId(record.id); setShowDeleteModal(true); }} className="text-red-400 hover:text-red-300 text-xs font-medium hover:bg-red-500/10 rounded-lg px-3 py-1.5 transition-colors">
                                                        Remover
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <Pagination data={records} />
                    </>
                )}
            </div>

            <Modal show={showModal} onClose={() => setShowModal(false)} title="Novo Lancamento" maxWidth="lg">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="md:col-span-2">
                            <label className="block text-sm font-semibold text-[var(--text-secondary)] mb-1.5">Titulo *</label>
                            <input type="text" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="input-premium" required />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-[var(--text-secondary)] mb-1.5">Pessoa</label>
                            <input type="text" value={form.person_name} onChange={(e) => setForm({ ...form, person_name: e.target.value })} className="input-premium" />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-[var(--text-secondary)] mb-1.5">Valor (R$) *</label>
                            <input type="number" step="0.01" value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} className="input-premium" required />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-[var(--text-secondary)] mb-1.5">Vencimento *</label>
                            <input type="date" value={form.due_date} onChange={(e) => setForm({ ...form, due_date: e.target.value })} className="input-premium" required />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-[var(--text-secondary)] mb-1.5">Categoria</label>
                            <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="select-premium">
                                <option value="">Selecione</option>
                                <option value="Salario">Salario</option>
                                <option value="Comissao">Comissao</option>
                                <option value="Bonificacao">Bonificacao</option>
                                <option value="Pro-labore">Pro-labore</option>
                                <option value="Bonus">Bonus</option>
                            </select>
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-semibold text-[var(--text-secondary)] mb-1.5">Observacoes</label>
                            <textarea value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} rows={2} className="input-premium" />
                        </div>
                    </div>
                    <div className="flex justify-end gap-3 pt-4 border-t border-[var(--border-subtle)]">
                        <button type="button" onClick={() => setShowModal(false)} className="btn-secondary">Cancelar</button>
                        <button type="submit" className="btn-primary">Salvar</button>
                    </div>
                </form>
            </Modal>

            <ConfirmDialog
                show={showDeleteModal}
                title="Remover Lancamento"
                message="Tem certeza que deseja remover este lancamento? Esta acao nao pode ser desfeita."
                confirmLabel="Remover"
                onConfirm={confirmDelete}
                onClose={() => { setShowDeleteModal(false); setDeleteId(null); }}
            />
        </AuthenticatedLayout>
    );
}
