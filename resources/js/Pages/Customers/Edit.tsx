import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import CustomerForm from './Partials/CustomerForm';
import { Head } from '@inertiajs/react';
import { Customer } from '@/types';

interface Props { customer: Customer; }

export default function CustomersEdit({ customer }: Props) {
    return (
        <AuthenticatedLayout header={<h2 className="text-xl font-bold text-gray-900 tracking-tight">Editar Cliente</h2>}>
            <Head title="SysJuros - Editar Cliente" />
            <CustomerForm customer={customer} />
        </AuthenticatedLayout>
    );
}
