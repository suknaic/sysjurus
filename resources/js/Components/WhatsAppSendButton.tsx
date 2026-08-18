import { useState, useEffect, useRef } from 'react';
import { Installment, MessageTemplate } from '@/types';

interface Props {
    installment: Installment;
}

function formatPhone(phone: string | null, isInternational: boolean): string {
    if (!phone) return '';
    const digits = phone.replace(/\D/g, '');
    if (isInternational) return digits;
    if (digits.length === 11) return '55' + digits;
    if (digits.length === 10) return '55' + digits;
    return digits;
}

function formatDateBR(date: string): string {
    const d = date.split('T')[0];
    const [y, m, day] = d.split('-');
    return `${day}/${m}/${y}`;
}

function renderTemplate(template: string, installment: Installment): string {
    const customer = installment.contract?.customer;
    const contract = installment.contract;
    const remaining = installment.amount_due - installment.amount_paid;

    const vars: Record<string, string> = {
        nome_cliente: customer?.name ?? '',
        codigo_contrato: contract?.code ?? '',
        numero_parcela: installment.installment_number + 'ª',
        valor_parcela: 'R$ ' + installment.amount_due.toFixed(2).replace('.', ','),
        valor_pago: 'R$ ' + installment.amount_paid.toFixed(2).replace('.', ','),
        valor_restante: 'R$ ' + remaining.toFixed(2).replace('.', ','),
        data_vencimento: formatDateBR(installment.due_date),
        dias_atraso: String(Math.max(0, Math.floor((Date.now() - new Date(installment.due_date + 'T12:00:00').getTime()) / 86400000))),
        data_hoje: formatDateBR(new Date().toISOString()),
        telefone_cliente: customer?.phone ?? '',
    };

    let result = template;
    for (const [key, value] of Object.entries(vars)) {
        result = result.replaceAll('{{' + key + '}}', value);
    }
    return result;
}

export default function WhatsAppSendButton({ installment }: Props) {
    const [open, setOpen] = useState(false);
    const [templates, setTemplates] = useState<MessageTemplate[]>([]);
    const [loading, setLoading] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const fetchTemplates = async () => {
        if (templates.length > 0) return;
        setLoading(true);
        try {
            const res = await fetch('/message-templates/list', {
                headers: { Accept: 'application/json', 'X-Requested-With': 'XMLHttpRequest' },
            });
            const data = await res.json();
            setTemplates(data ?? []);
        } catch {
            setTemplates([]);
        }
        setLoading(false);
    };

    const handleOpen = () => {
        setOpen(true);
        fetchTemplates();
    };

    const sendMessage = (message: string) => {
        const phone = formatPhone(
            installment.contract?.customer?.phone ?? null,
            installment.contract?.customer?.phone_is_international ?? false
        );
        const rendered = renderTemplate(message, installment);
        const url = `https://wa.me/${phone}?text=${encodeURIComponent(rendered)}`;
        window.open(url, '_blank');
        setOpen(false);
    };

    const phone = formatPhone(
        installment.contract?.customer?.phone ?? null,
        installment.contract?.customer?.phone_is_international ?? false
    );

    if (!phone) return null;

    return (
        <div className="relative" ref={ref}>
            <button
                onClick={handleOpen}
                className="inline-flex items-center gap-1 rounded-lg bg-emerald-500 px-2.5 py-1.5 text-xs font-semibold text-white shadow-sm shadow-emerald-500/25 hover:bg-emerald-600 hover:shadow-emerald-500/40 transition-all duration-200"
                title="Enviar WhatsApp"
            >
                <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                WhatsApp
            </button>

            {open && (
                <div className="absolute right-0 top-full z-50 mt-1 w-72 rounded-xl border border-gray-200 bg-white shadow-xl shadow-gray-200/50 overflow-hidden">
                    <div className="px-3 py-2 border-b border-gray-100 bg-gray-50/80">
                        <p className="text-xs font-semibold text-gray-600">Enviar mensagem via WhatsApp</p>
                    </div>
                    <div className="max-h-64 overflow-y-auto divide-y divide-gray-50">
                        {loading ? (
                            <div className="p-4 text-center text-xs text-gray-400">Carregando templates...</div>
                        ) : templates.length === 0 ? (
                            <div className="p-4 text-center text-xs text-gray-400">Nenhum template encontrado.</div>
                        ) : (
                            templates.map(template => (
                                <button
                                    key={template.id}
                                    onClick={() => sendMessage(template.message)}
                                    className="w-full text-left px-3 py-2.5 hover:bg-emerald-50 transition-colors group"
                                >
                                    <p className="text-xs font-semibold text-gray-900 group-hover:text-emerald-700">{template.name}</p>
                                    <p className="text-[11px] text-gray-400 mt-0.5 line-clamp-2">{renderTemplate(template.message, installment)}</p>
                                </button>
                            ))
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
