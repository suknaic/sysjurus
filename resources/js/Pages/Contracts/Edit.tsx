import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import ContractForm from './Partials/ContractForm';
import { Head } from '@inertiajs/react';
import { Contract, Customer } from '@/types';

interface Props { contract: Contract; customers: Customer[]; }

export default function ContractsEdit({ contract, customers }: Props) {
    return (
        <AuthenticatedLayout header={<h2 className="text-xl font-bold text-[var(--text-primary)] tracking-tight font-['Montserrat']">Editar Contrato</h2>}>
            <Head title="Receba+ - Editar Contrato" />
            <ContractForm contract={contract} customers={customers} />
        </AuthenticatedLayout>
    );
}
