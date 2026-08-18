import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import CustomerForm from './Partials/CustomerForm';
import { Head } from '@inertiajs/react';

export default function CustomersCreate() {
    return (
        <AuthenticatedLayout header={<h2 className="text-xl font-bold text-gray-900 tracking-tight">Novo Cliente</h2>}>
            <Head title="SysJuros - Novo Cliente" />
            <CustomerForm />
        </AuthenticatedLayout>
    );
}
