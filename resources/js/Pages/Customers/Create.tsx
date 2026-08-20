import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import CustomerForm from './Partials/CustomerForm';
import { Head } from '@inertiajs/react';

export default function CustomersCreate() {
    return (
        <AuthenticatedLayout header={<h2 className="text-xl font-bold text-[var(--text-primary)] tracking-tight font-['Montserrat']">Novo Cliente</h2>}>
            <Head title="Receba+ - Novo Cliente" />
            <CustomerForm />
        </AuthenticatedLayout>
    );
}
