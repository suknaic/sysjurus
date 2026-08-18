import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PageHeader from '@/Components/PageHeader';
import StatusBadge from '@/Components/StatusBadge';
import { Head, router } from '@inertiajs/react';
import { PageProps, Contract, Customer } from '@/types';
import { useState } from 'react';

interface Props extends PageProps {
    contracts: Contract[];
    customers: Customer[];
    filters: { status?: string; customer_id?: string; date_from?: string; date_to?: string };
}

function formatCurrency(value: number): string {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
}

export default function ReportsIndex({ contracts, customers, filters }: Props) {
    const [formFilters, setFormFilters] = useState({
        status: filters.status || '',
        customer_id: filters.customer_id || '',
        date_from: filters.date_from || '',
        date_to: filters.date_to || '',
    });

    const handleFilter = (e: React.FormEvent) => {
        e.preventDefault();
        router.get('/reports', formFilters, { preserveState: true });
    };

    const totalAmount = contracts.reduce((sum, c) => sum + Number(c.amount), 0);
    const totalPaid = contracts.reduce((sum, c) => sum + (c.installments?.filter(i => i.status === 'paid').reduce((s, i) => s + Number(i.amount_paid), 0) || 0), 0);

    return (
        <AuthenticatedLayout header={<h2 className="text-xl font-bold text-gray-900 tracking-tight">Relatorios</h2>}>
            <Head title="SysJuros - Relatorios" />

            <PageHeader title="Relatorios" />

            <form onSubmit={handleFilter} className="card-premium mb-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
                    <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1.5">Status</label>
                        <select value={formFilters.status} onChange={(e) => setFormFilters({ ...formFilters, status: e.target.value })} className="select-premium">
                            <option value="">Todos</option>
                            <option value="active">Ativo</option>
                            <option value="completed">Concluido</option>
                            <option value="cancelled">Cancelado</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1.5">Cliente</label>
                        <select value={formFilters.customer_id} onChange={(e) => setFormFilters({ ...formFilters, customer_id: e.target.value })} className="select-premium">
                            <option value="">Todos</option>
                            {customers.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1.5">Data Inicio</label>
                        <input type="date" value={formFilters.date_from} onChange={(e) => setFormFilters({ ...formFilters, date_from: e.target.value })} className="input-premium" />
                    </div>
                    <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1.5">Data Fim</label>
                        <input type="date" value={formFilters.date_to} onChange={(e) => setFormFilters({ ...formFilters, date_to: e.target.value })} className="input-premium" />
                    </div>
                    <div className="flex items-end">
                        <button type="submit" className="btn-primary w-full">
                            <svg className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" /></svg>
                            Filtrar
                        </button>
                    </div>
                </div>
            </form>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                <div className="card-premium text-center">
                    <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">Total Contratos</p>
                    <p className="text-3xl font-bold text-gray-900">{contracts.length}</p>
                </div>
                <div className="card-premium text-center">
                    <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">Valor Total</p>
                    <p className="text-3xl font-bold text-blue-600">{formatCurrency(totalAmount)}</p>
                </div>
                <div className="card-premium text-center">
                    <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">Total Recebido</p>
                    <p className="text-3xl font-bold text-emerald-600">{formatCurrency(totalPaid)}</p>
                </div>
            </div>

            <div className="card-premium overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full table-premium">
                        <thead>
                            <tr>
                                <th>Codigo</th>
                                <th>Cliente</th>
                                <th>Valor</th>
                                <th className="hidden sm:table-cell">Parcelas</th>
                                <th className="hidden md:table-cell">Frequencia</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {contracts.length === 0 ? (
                                <tr><td colSpan={6} className="px-6 py-12 text-center text-sm text-gray-500">Nenhum resultado encontrado</td></tr>
                            ) : (
                                contracts.map((contract) => (
                                    <tr key={contract.id}>
                                        <td className="font-semibold text-indigo-600">{contract.code}</td>
                                        <td className="text-gray-500">{contract.customer?.name}</td>
                                        <td className="font-semibold text-gray-900">{formatCurrency(contract.amount)}</td>
                                        <td className="hidden sm:table-cell text-gray-500">{contract.total_installments}x</td>
                                        <td className="hidden md:table-cell text-gray-500">{contract.payment_frequency}</td>
                                        <td><StatusBadge status={contract.status} /></td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
