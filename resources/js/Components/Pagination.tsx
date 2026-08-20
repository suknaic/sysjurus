import { Link } from '@inertiajs/react';
import { PaginatedData } from '@/types';

interface Props {
    data: PaginatedData<any>;
}

export default function Pagination({ data }: Props) {
    if (data.last_page <= 1) return null;

    return (
        <div className="flex items-center justify-between border-t border-[var(--border-subtle)] bg-[var(--bg-table-header)] px-5 py-4 sm:px-6 rounded-b-2xl">
            <div className="flex flex-1 justify-between sm:hidden">
                {data.current_page > 1 && (
                    <Link href={data.links[data.current_page - 1]?.url || '#'} className="btn-secondary text-xs">
                        Anterior
                    </Link>
                )}
                {data.current_page < data.last_page && (
                    <Link href={data.links[data.current_page + 1]?.url || '#'} className="btn-secondary text-xs ml-auto">
                        Proximo
                    </Link>
                )}
            </div>
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                <p className="text-sm text-[var(--text-muted)]">
                    Mostrando <span className="font-semibold text-[var(--text-secondary)]">{data.from}</span> a{' '}
                    <span className="font-semibold text-[var(--text-secondary)]">{data.to}</span> de{' '}
                    <span className="font-semibold text-[var(--text-secondary)]">{data.total}</span> resultados
                </p>
                <div className="flex gap-1.5">
                    {data.links.map((link, i) => (
                        <Link
                            key={i}
                            href={link.url || '#'}
                            className={`inline-flex items-center rounded-lg px-3 py-1.5 text-sm font-medium transition-all duration-300 ${
                                link.active
                                    ? 'gradient-gold text-black shadow-md shadow-amber-500/25'
                                    : 'bg-[var(--bg-input)] text-[var(--text-muted)] border border-[var(--border-subtle)] hover:bg-[var(--bg-input-focus)] hover:text-[var(--text-primary)] hover:border-[#C9A84C]/30'
                            } ${!link.url ? 'opacity-40 cursor-not-allowed' : ''}`}
                            preserveScroll
                        >
                            {link.label.replace('&laquo;', '«').replace('&raquo;', '»')}
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
