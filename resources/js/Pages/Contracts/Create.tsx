import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import ContractForm from './Partials/ContractForm';
import { Head } from '@inertiajs/react';
import { Customer } from '@/types';

interface Props { customers: Customer[]; }

export default function ContractsCreate({ customers }: Props) {
    return (
        <AuthenticatedLayout header={<h2 className="text-xl font-bold text-[var(--text-primary)] tracking-tight font-['Montserrat']">Novo Contrato</h2>}>
            <Head title="Receba+ - Novo Contrato" />
            <ContractForm customers={customers} />
        </AuthenticatedLayout>
    );
}
