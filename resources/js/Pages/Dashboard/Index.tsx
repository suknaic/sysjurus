import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import StatsCard from '@/Components/StatsCard';
import StatusBadge from '@/Components/StatusBadge';
import FlashMessage from '@/Components/FlashMessage';
import { Head, Link } from '@inertiajs/react';
import { PageProps, Installment } from '@/types';

interface Metrics {
    totalCustomers: number;
    totalContracts: number;
    toReceive: number;
    overdue: number;
    receivedToday: number;
    totalReceived: number;
    pendingCount: number;
    overdueCount: number;
    paidCount: number;
}

interface Props extends PageProps {
    metrics: Metrics;
    recentInstallments: Installment[];
}

function formatCurrency(value: number): string {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
}

function formatDate(date: string): string {
    return new Date(date).toLocaleDateString('pt-BR');
}

export default function DashboardIndex({ metrics, recentInstallments }: Props) {
    return (
        <AuthenticatedLayout
            header={<h2 className="text-xl font-bold text-gray-900 tracking-tight">Dashboard</h2>}
        >
            <Head title="SysJuros - Dashboard" />
            <FlashMessage />

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
                <StatsCard title="A Receber" value={formatCurrency(metrics.toReceive)} icon={<svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>} color="blue" subtitle={`${metrics.pendingCount} parcelas`} />
                <StatsCard title="Hoje" value={formatCurrency(metrics.receivedToday)} icon={<svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" /></svg>} color="green" />
                <StatsCard title="Atrasadas" value={formatCurrency(metrics.overdue)} icon={<svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" /></svg>} color="red" subtitle={`${metrics.overdueCount} parcelas`} />
                <StatsCard title="Recebidas" value={formatCurrency(metrics.totalReceived)} icon={<svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>} color="green" subtitle={`${metrics.paidCount} parcelas`} />
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 mb-8">
                <StatsCard title="Clientes" value={metrics.totalCustomers} icon={<svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" /></svg>} color="indigo" />
                <StatsCard title="Contratos Ativos" value={metrics.totalContracts} icon={<svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg>} color="indigo" />
                <div className="card-premium-hover">
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-4">Acoes Rapidas</h3>
                    <div className="space-y-2.5">
                        <Link href="/customers/create" className="btn-primary w-full text-center">
                            <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" /></svg>
                            Novo Cliente
                        </Link>
                        <Link href="/contracts/create" className="btn-secondary w-full text-center">
                            <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
                            Novo Contrato
                        </Link>
                    </div>
                </div>
            </div>

            <div className="card-premium overflow-hidden">
                <div className="px-6 py-5 border-b border-gray-100">
                    <h3 className="text-lg font-bold text-gray-900">Movimentacoes Recentes</h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full table-premium">
                        <thead>
                            <tr>
                                <th>Parcela</th>
                                <th>Cliente</th>
                                <th>Vencimento</th>
                                <th>Valor</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentInstallments.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-12 text-center text-sm text-gray-500">Nenhum registro encontrado</td>
                                </tr>
                            ) : (
                                recentInstallments.map((inst) => (
                                    <tr key={inst.id}>
                                        <td className="font-medium text-gray-900">{inst.contract?.code} - {inst.installment_number}ª</td>
                                        <td className="text-gray-500">{inst.contract?.customer?.name}</td>
                                        <td className="text-gray-500">{formatDate(inst.due_date)}</td>
                                        <td className="font-semibold text-gray-900">{formatCurrency(inst.amount_due)}</td>
                                        <td><StatusBadge status={inst.status} /></td>
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
