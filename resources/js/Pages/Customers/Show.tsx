import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import StatusBadge from '@/Components/StatusBadge';
import { Head, Link } from '@inertiajs/react';
import { PageProps, Customer } from '@/types';

interface Props extends PageProps { customer: Customer; }

function formatDate(date: string | null): string {
    if (!date) return '-';
    const d = date.split('T')[0];
    const [y, m, day] = d.split('-');
    return `${day}/${m}/${y}`;
}

export default function CustomersShow({ customer }: Props) {
    return (
        <AuthenticatedLayout header={<h2 className="text-xl font-bold text-gray-900 tracking-tight">{customer.name}</h2>}>
            <Head title={`SysJuros - ${customer.name}`} />

            <div className="mb-6">
                <Link href="/customers" className="inline-flex items-center gap-1.5 text-sm font-medium text-indigo-600 hover:text-indigo-700 transition-colors">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" /></svg>
                    Voltar para clientes
                </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="card-premium">
                    <h3 className="text-lg font-bold text-gray-900 mb-5">
                        <span className="flex items-center gap-2">
                            <svg className="h-5 w-5 text-indigo-500" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" /></svg>
                            Identificacao
                        </span>
                    </h3>
                    <dl className="space-y-3.5">
                        {[
                            ['Nome', customer.name],
                            ['Email', customer.email || '-'],
                            ['Telefone', customer.phone || '-'],
                            ['Nascimento', formatDate(customer.birth_date)],
                            ['CPF/CNPJ', customer.document_number || '-'],
                            ['RG', customer.rg || '-'],
                        ].map(([label, value]) => (
                            <div key={label as string} className="flex justify-between items-center py-2 border-b border-gray-50 last:border-0">
                                <dt className="text-sm text-gray-500">{label}</dt>
                                <dd className="text-sm font-semibold text-gray-900">{value}</dd>
                            </div>
                        ))}
                    </dl>
                </div>
                <div className="card-premium">
                    <h3 className="text-lg font-bold text-gray-900 mb-5">
                        <span className="flex items-center gap-2">
                            <svg className="h-5 w-5 text-indigo-500" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" /></svg>
                            Endereco
                        </span>
                    </h3>
                    <dl className="space-y-3.5">
                        {[
                            ['CEP', customer.zip_code || '-'],
                            ['Endereco', customer.address || '-'],
                            ['Numero', customer.number || '-'],
                            ['Complemento', customer.complement || '-'],
                            ['Bairro', customer.district || '-'],
                            ['Cidade', customer.city || '-'],
                            ['UF', customer.state || '-'],
                        ].map(([label, value]) => (
                            <div key={label as string} className="flex justify-between items-center py-2 border-b border-gray-50 last:border-0">
                                <dt className="text-sm text-gray-500">{label}</dt>
                                <dd className="text-sm font-semibold text-gray-900">{value}</dd>
                            </div>
                        ))}
                    </dl>
                </div>
            </div>

            {customer.contracts && customer.contracts.length > 0 && (
                <div className="mt-6 card-premium overflow-hidden">
                    <div className="px-6 py-5 border-b border-gray-100">
                        <h3 className="text-lg font-bold text-gray-900">Contratos</h3>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full table-premium">
                            <thead>
                                <tr>
                                    <th>Codigo</th>
                                    <th>Valor</th>
                                    <th>Status</th>
                                    <th>Parcelas</th>
                                </tr>
                            </thead>
                            <tbody>
                                {customer.contracts.map((contract) => (
                                    <tr key={contract.id}>
                                        <td><Link href={`/contracts/${contract.id}`} className="text-indigo-600 hover:text-indigo-700 font-semibold">{contract.code}</Link></td>
                                        <td className="font-semibold text-gray-900">R$ {Number(contract.amount).toLocaleString('pt-BR')}</td>
                                        <td><StatusBadge status={contract.status} /></td>
                                        <td className="text-gray-500">{contract.total_installments}x</td>
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
