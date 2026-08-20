import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import CustomerForm from './Partials/CustomerForm';
import { Head } from '@inertiajs/react';
import { Customer } from '@/types';

interface Props { customer: Customer; }

export default function CustomersEdit({ customer }: Props) {
    return (
        <AuthenticatedLayout header={<h2 className="text-xl font-bold text-[var(--text-primary)] tracking-tight font-['Montserrat']">Editar Cliente</h2>}>
            <Head title="Receba+ - Editar Cliente" />
            <CustomerForm customer={customer} />
        </AuthenticatedLayout>
    );
}
