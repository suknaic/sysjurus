import { PageProps as InertiaPageProps } from '@inertiajs/react';

export interface User {
    id: number;
    name: string;
    email: string;
    role: string;
    is_active: boolean;
    last_login_at: string | null;
    created_at: string;
}

export interface Customer {
    id: number;
    user_id: number;
    name: string;
    email: string | null;
    phone: string | null;
    phone_is_international: boolean;
    birth_date: string | null;
    document_type: string | null;
    document_number: string | null;
    rg: string | null;
    zip_code: string | null;
    address: string | null;
    number: string | null;
    complement: string | null;
    district: string | null;
    city: string | null;
    state: string | null;
    notes: string | null;
    created_at: string;
    contracts?: Contract[];
}

export interface Contract {
    id: number;
    user_id: number;
    customer_id: number;
    code: string;
    description: string | null;
    amount: number;
    interest_rate: number;
    fine_amount: number;
    payment_frequency: string;
    first_payment_date: string;
    total_installments: number;
    status: string;
    notes: string | null;
    created_at: string;
    customer?: Customer;
    installments?: Installment[];
}

export interface Installment {
    id: number;
    contract_id: number;
    installment_number: number;
    due_date: string;
    amount_due: number;
    amount_paid: number;
    paid_at: string | null;
    status: string;
    days_overdue: number;
    created_at: string;
    contract?: Contract;
    payments?: Payment[];
}

export interface Payment {
    id: number;
    installment_id: number;
    user_id: number;
    amount: number;
    payment_date: string;
    payment_method: string | null;
    reference: string | null;
    notes: string | null;
    created_at: string;
    user?: User;
}

export interface SalaryRecord {
    id: number;
    user_id: number;
    title: string;
    person_name: string | null;
    amount: number;
    due_date: string;
    received_at: string | null;
    status: string;
    category: string | null;
    notes: string | null;
    created_at: string;
}

export interface MessageTemplate {
    id: number;
    user_id: number;
    name: string;
    category: string;
    message: string;
    is_active: boolean;
    sort_order: number;
    created_at: string;
}

export interface PaginatedData<T> {
    data: T[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from: number;
    to: number;
    links: Array<{ url: string | null; label: string; active: boolean }>;
}

export interface PageProps extends InertiaPageProps {
    auth: {
        user: User;
    };
    flash: {
        success?: string;
        error?: string;
    };
}
