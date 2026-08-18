import { ReactNode } from 'react';

interface Props {
    title: string;
    value: string | number;
    icon: ReactNode;
    color?: 'indigo' | 'green' | 'red' | 'yellow' | 'blue';
    subtitle?: string;
}

const colorStyles = {
    indigo: {
        icon: 'bg-gradient-to-br from-indigo-500 to-violet-600 shadow-indigo-500/25',
        value: 'text-gray-900',
    },
    green: {
        icon: 'bg-gradient-to-br from-emerald-500 to-green-600 shadow-emerald-500/25',
        value: 'text-emerald-600',
    },
    red: {
        icon: 'bg-gradient-to-br from-red-500 to-rose-600 shadow-red-500/25',
        value: 'text-red-600',
    },
    yellow: {
        icon: 'bg-gradient-to-br from-amber-500 to-orange-500 shadow-amber-500/25',
        value: 'text-amber-600',
    },
    blue: {
        icon: 'bg-gradient-to-br from-blue-500 to-cyan-500 shadow-blue-500/25',
        value: 'text-blue-600',
    },
};

export default function StatsCard({ title, value, icon, color = 'indigo', subtitle }: Props) {
    const styles = colorStyles[color];

    return (
        <div className="card-premium-hover group">
            <div className="flex items-center gap-3">
                <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${styles.icon} shadow-lg transition-transform duration-300 group-hover:scale-110`}>
                    <span className="text-white">{icon}</span>
                </div>
                <div className="flex-1 min-w-0">
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 truncate">{title}</p>
                    <p className={`text-3xl font-extrabold leading-tight tracking-tight ${styles.value}`}>{value}</p>
                    {subtitle && <p className="text-[11px] text-gray-400 mt-0.5">{subtitle}</p>}
                </div>
            </div>
        </div>
    );
}
