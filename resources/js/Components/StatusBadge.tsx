interface Props {
    status: string;
}

const statusStyles: Record<string, string> = {
    active: 'bg-emerald-500/10 text-emerald-400 ring-emerald-500/20',
    pending: 'bg-amber-500/10 text-amber-400 ring-amber-500/20',
    overdue: 'bg-red-500/10 text-red-400 ring-red-500/20',
    paid: 'bg-emerald-500/10 text-emerald-400 ring-emerald-500/20',
    partial: 'bg-blue-500/10 text-blue-400 ring-blue-500/20',
    cancelled: 'bg-[var(--bg-input)] text-[var(--text-muted)] ring-[var(--border-subtle)]',
    completed: 'bg-[#C9A84C]/10 text-[#D4AF37] ring-[#C9A84C]/20',
    received: 'bg-emerald-500/10 text-emerald-400 ring-emerald-500/20',
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
        <span className={`inline-flex items-center rounded-lg px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${statusStyles[status] || 'bg-[var(--bg-input)] text-[var(--text-muted)] ring-[var(--border-subtle)]'}`}>
            {statusLabels[status] || status}
        </span>
    );
}
