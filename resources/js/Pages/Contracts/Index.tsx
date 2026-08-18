import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PageHeader from '@/Components/PageHeader';
import Pagination from '@/Components/Pagination';
import EmptyState from '@/Components/EmptyState';
import StatusBadge from '@/Components/StatusBadge';
import FlashMessage from '@/Components/FlashMessage';
import { Head, Link, router } from '@inertiajs/react';
import { PageProps, Contract, PaginatedData } from '@/types';
import { useState } from 'react';

interface Props extends PageProps {
    contracts: PaginatedData<Contract>;
    filters: { search?: string; status?: string };
}

function formatCurrency(value: number): string {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
}

export default function ContractsIndex({ contracts, filters }: Props) {
    const [search, setSearch] = useState(filters.search || '');
    const [status, setStatus] = useState(filters.status || '');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get('/contracts', { search, status }, { preserveState: true });
    };

    const handleDelete = (id: number, code: string) => {
        if (confirm(`Deseja remover o contrato "${code}"?`)) {
            router.delete(`/contracts/${id}`);
        }
    };

    return (
        <AuthenticatedLayout header={<h2 className="text-xl font-bold text-gray-900 tracking-tight">Contratos</h2>}>
            <Head title="SysJuros - Contratos" />
            <FlashMessage />

            <PageHeader title="Contratos">
                <Link href="/contracts/create" className="btn-primary">
                    <svg className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
                    Novo contrato
                </Link>
            </PageHeader>

            <form onSubmit={handleSearch} className="mb-6 flex gap-3 flex-wrap">
                <div className="relative flex-1 min-w-[200px]">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                        <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" /></svg>
                    </div>
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Buscar por codigo..."
                        className="input-premium pl-10"
                    />
                </div>
                <select value={status} onChange={(e) => setStatus(e.target.value)} className="select-premium">
                    <option value="">Todos os status</option>
                    <option value="active">Ativo</option>
                    <option value="completed">Concluido</option>
                    <option value="cancelled">Cancelado</option>
                </select>
                <button type="submit" className="btn-secondary">
                    <svg className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" /></svg>
                    Filtrar
                </button>
            </form>

            <div className="card-premium overflow-hidden">
                {contracts.data.length === 0 ? (
                    <EmptyState title="Nenhum contrato encontrado" description="Crie um novo contrato para comecar." />
                ) : (
                    <>
                        <div className="px-5 py-3 bg-gray-50/80 border-b border-gray-100">
                            <p className="text-sm text-gray-500">{contracts.total} contrato(s) encontrado(s)</p>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full table-premium">
                                <thead>
                                    <tr>
                                        <th>Codigo</th>
                                        <th className="hidden sm:table-cell">Cliente</th>
                                        <th>Valor</th>
                                        <th className="hidden md:table-cell">Parcelas</th>
                                        <th className="hidden md:table-cell">Frequencia</th>
                                        <th>Status</th>
                                        <th className="text-right">Acoes</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {contracts.data.map((contract) => (
                                        <tr key={contract.id}>
                                            <td className="font-semibold">
                                                <Link href={`/contracts/${contract.id}`} className="text-indigo-600 hover:text-indigo-700">{contract.code}</Link>
                                            </td>
                                            <td className="hidden sm:table-cell text-gray-500">{contract.customer?.name}</td>
                                            <td className="font-semibold text-gray-900">{formatCurrency(contract.amount)}</td>
                                            <td className="hidden md:table-cell text-gray-500">{contract.total_installments}x</td>
                                            <td className="hidden md:table-cell text-gray-500">{contract.payment_frequency}</td>
                                            <td><StatusBadge status={contract.status} /></td>
                                            <td className="text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <Link href={`/contracts/${contract.id}/edit`} className="btn-secondary text-xs !px-3 !py-1.5">
                                                        Editar
                                                    </Link>
                                                    <button onClick={() => handleDelete(contract.id, contract.code)} className="text-red-500 hover:text-red-700 text-xs font-medium hover:bg-red-50 rounded-lg px-3 py-1.5 transition-colors">
                                                        Remover
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <Pagination data={contracts} />
                    </>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
