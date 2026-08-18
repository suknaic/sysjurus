interface Props {
    status: string;
}

const statusStyles: Record<string, string> = {
    active: 'bg-emerald-50 text-emerald-700 ring-emerald-600/20',
    pending: 'bg-amber-50 text-amber-700 ring-amber-600/20',
    overdue: 'bg-red-50 text-red-700 ring-red-600/20',
    paid: 'bg-emerald-50 text-emerald-700 ring-emerald-600/20',
    partial: 'bg-blue-50 text-blue-700 ring-blue-600/20',
    cancelled: 'bg-gray-100 text-gray-600 ring-gray-500/20',
    completed: 'bg-indigo-50 text-indigo-700 ring-indigo-600/20',
    received: 'bg-emerald-50 text-emerald-700 ring-emerald-600/20',
};

const statusLabels: Record<string, string> = {
    active: 'Ativo',
    pending: 'Pendente',
    overdue: 'Atrasado',
    paid: 'Pago',
    partial: 'Parcial',
    cancelled: 'Cancelado',
    completed: 'Concluido',
    received: 'Recebido',
};

export default function StatusBadge({ status }: Props) {
    return (
        <span className={`inline-flex items-center rounded-lg px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${statusStyles[status] || 'bg-gray-100 text-gray-600 ring-gray-500/20'}`}>
            {statusLabels[status] || status}
        </span>
    );
}
