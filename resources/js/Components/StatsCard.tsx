import { ReactNode } from 'react';

interface Props {
    title: string;
    value: string | number;
    icon: ReactNode;
    color?: 'indigo' | 'green' | 'red' | 'yellow' | 'blue';
    subtitle?: string;
    accent?: boolean;
    className?: string;
}

const colorStyles = {
    indigo: {
        icon: 'gradient-gold shadow-amber-500/20',
        value: 'text-white',
        bar: 'from-[#C9A84C] to-[#D4AF37]',
    },
    green: {
        icon: 'bg-gradient-to-br from-emerald-500 to-green-600 shadow-emerald-500/25',
        value: 'text-emerald-400',
        bar: 'from-emerald-500 to-green-600',
    },
    red: {
        icon: 'bg-gradient-to-br from-red-500 to-rose-600 shadow-red-500/25',
        value: 'text-red-400',
        bar: 'from-red-500 to-rose-600',
    },
    yellow: {
        icon: 'bg-gradient-to-br from-amber-500 to-orange-500 shadow-amber-500/25',
        value: 'text-amber-400',
        bar: 'from-amber-500 to-orange-500',
    },
    blue: {
        icon: 'bg-gradient-to-br from-blue-500 to-cyan-500 shadow-blue-500/25',
        value: 'text-blue-400',
        bar: 'from-blue-500 to-cyan-500',
    },
};

export default function StatsCard({ title, value, icon, color = 'indigo', subtitle, accent, className = '' }: Props) {
    const styles = colorStyles[color];

    if (accent) {
        return (
            <div className={`card-premium-hover group relative overflow-hidden ${className}`}>
                <div className="flex items-center gap-2.5">
                    <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${styles.icon} shadow-lg transition-transform duration-300 group-hover:scale-110`}>
                        <span className="text-white">{icon}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--text-muted)] truncate">{title}</p>
                        <p className={`text-2xl font-extrabold leading-none tracking-tight ${styles.value}`}>{value}</p>
                        {subtitle && <p className="text-[10px] text-[var(--text-faint)] mt-1">{subtitle}</p>}
                    </div>
                </div>
                <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r ${styles.bar} opacity-60`} />
            </div>
        );
    }

    return (
        <div className={`card-premium-hover group ${className}`}>
            <div className="flex items-center gap-3">
                <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${styles.icon} shadow-lg transition-transform duration-300 group-hover:scale-110`}>
                    <span className="text-white">{icon}</span>
                </div>
                <div className="flex-1 min-w-0">
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-[var(--text-muted)] truncate">{title}</p>
                    <p className={`text-3xl font-extrabold leading-tight tracking-tight ${styles.value}`}>{value}</p>
                    {subtitle && <p className="text-[11px] text-[var(--text-faint)] mt-0.5">{subtitle}</p>}
                </div>
            </div>
        </div>
    );
}
