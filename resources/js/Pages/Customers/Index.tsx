import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PageHeader from '@/Components/PageHeader';
import Pagination from '@/Components/Pagination';
import EmptyState from '@/Components/EmptyState';
import FlashMessage from '@/Components/FlashMessage';
import ConfirmDialog from '@/Components/ConfirmDialog';
import { Head, Link, router } from '@inertiajs/react';
import { PageProps, Customer, PaginatedData } from '@/types';
import { useState } from 'react';

interface Props extends PageProps {
    customers: PaginatedData<Customer>;
    filters: { search?: string };
}

export default function CustomersIndex({ customers, filters }: Props) {
    const [search, setSearch] = useState(filters.search || '');
    const [deleteTarget, setDeleteTarget] = useState<{ id: number; name: string; contractsCount: number } | null>(null);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get('/customers', { search }, { preserveState: true });
    };

    const handleDelete = (id: number, name: string, contractsCount: number) => {
        setDeleteTarget({ id, name, contractsCount });
    };

    const confirmDelete = () => {
        if (deleteTarget && deleteTarget.contractsCount === 0) {
            router.delete(`/customers/${deleteTarget.id}`);
        }
        setDeleteTarget(null);
    };

    const deleteDialogTitle = deleteTarget && deleteTarget.contractsCount > 0
        ? 'Cliente possui contratos'
        : 'Remover cliente';

    const deleteDialogMessage = deleteTarget && deleteTarget.contractsCount > 0
        ? `O cliente "${deleteTarget.name}" possui ${deleteTarget.contractsCount} contrato(s) ativo(s) e nao pode ser removido.`
        : `Deseja remover o cliente "${deleteTarget?.name}"? Esta acao nao pode ser desfeita.`;

    return (
        <AuthenticatedLayout header={<h2 className="text-xl font-bold text-[var(--text-primary)] tracking-tight font-['Montserrat']">Clientes</h2>}>
            <Head title="Receba+ - Clientes" />
            <FlashMessage />

            <PageHeader title="Clientes">
                <Link href="/customers/create" className="btn-primary">
                    <svg className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
                    Novo cliente
                </Link>
            </PageHeader>

            <form onSubmit={handleSearch} className="mb-6 flex gap-3">
                <div className="relative flex-1">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                        <svg className="h-4 w-4 text-[var(--text-faint)]" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" /></svg>
                    </div>
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Buscar por nome ou email..."
                        className="input-premium pl-10"
                    />
                </div>
                <button type="submit" className="btn-secondary">
                    <svg className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" /></svg>
                    Buscar
                </button>
            </form>

            <div className="card-premium overflow-hidden">
                {customers.data.length === 0 ? (
                    <EmptyState title="Nenhum registro encontrado" description="Comece cadastrando um novo cliente." />
                ) : (
                    <>
                        <div className="px-5 py-3 bg-[var(--bg-table-header)] border-b border-[var(--border-subtle)]">
                            <p className="text-sm text-[var(--text-muted)]">{customers.total} cliente(s) encontrado(s)</p>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full table-premium">
                                <thead>
                                    <tr>
                                        <th>Nome</th>
                                        <th className="hidden sm:table-cell">Email</th>
                                        <th className="hidden md:table-cell">Telefone</th>
                                        <th className="hidden lg:table-cell">CPF/CNPJ</th>
                                        <th className="hidden lg:table-cell">Cidade</th>
                                        <th className="text-right">Acoes</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {customers.data.map((customer) => (
                                        <tr key={customer.id}>
                                            <td className="font-medium">
                                                <Link href={`/customers/${customer.id}`} className="text-[#C9A84C] hover:text-[#D4AF37] font-semibold transition-colors">{customer.name}</Link>
                                            </td>
                                            <td className="hidden sm:table-cell text-[var(--text-muted)]">{customer.email || '-'}</td>
                                            <td className="hidden md:table-cell text-[var(--text-muted)]">{customer.phone || '-'}</td>
                                            <td className="hidden lg:table-cell text-[var(--text-muted)]">{customer.document_number || '-'}</td>
                                            <td className="hidden lg:table-cell text-[var(--text-muted)]">{customer.city || '-'}</td>
                                            <td className="text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <Link href={`/customers/${customer.id}/edit`} className="btn-secondary text-xs !px-3 !py-1.5">
                                                        Editar
                                                    </Link>
                                                    <button onClick={() => handleDelete(customer.id, customer.name, customer.contracts?.length ?? 0)} className="text-red-400 hover:text-red-300 text-xs font-medium hover:bg-red-500/10 rounded-lg px-3 py-1.5 transition-colors">
                                                        Remover
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <Pagination data={customers} />
                    </>
                )}
            </div>

            <ConfirmDialog
                show={deleteTarget !== null}
                title={deleteDialogTitle}
                message={deleteDialogMessage}
                confirmLabel={deleteTarget && deleteTarget.contractsCount > 0 ? 'Entendido' : 'Remover'}
                danger={!deleteTarget || deleteTarget.contractsCount === 0}
                onConfirm={confirmDelete}
                onClose={() => setDeleteTarget(null)}
            />
        </AuthenticatedLayout>
    );
}
