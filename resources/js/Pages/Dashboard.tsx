import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard() {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-bold leading-tight text-[var(--text-primary)] font-['Montserrat']">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="card-premium p-6 text-[var(--text-primary)]">
                        Voce esta logado!
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
