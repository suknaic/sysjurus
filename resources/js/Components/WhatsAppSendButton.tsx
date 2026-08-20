import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
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
    const amountDue = Number(installment.amount_due) || 0;
    const amountPaid = Number(installment.amount_paid) || 0;
    const remaining = amountDue - amountPaid;

    const vars: Record<string, string> = {
        nome_cliente: customer?.name ?? '',
        codigo_contrato: contract?.code ?? '',
        numero_parcela: installment.installment_number + 'ª',
        valor_parcela: 'R$ ' + amountDue.toFixed(2).replace('.', ','),
        valor_pago: 'R$ ' + amountPaid.toFixed(2).replace('.', ','),
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

    useEffect(() => {
        if (!open) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setOpen(false);
        };
        document.addEventListener('keydown', onKey);
        return () => document.removeEventListener('keydown', onKey);
    }, [open]);

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

    const modal = open ? createPortal(
        <div
            className="fixed inset-0 flex items-center justify-center p-4"
            style={{ zIndex: 2147483647 }}
        >
            <div className="absolute inset-0 bg-black/60" onClick={() => setOpen(false)} />
            <div className="relative z-10 w-full max-w-lg rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-elevated)] p-6 shadow-2xl animate-slide-up">
                <div className="flex items-center justify-between mb-5">
                    <h3 className="text-lg font-bold text-[var(--text-primary)] font-['Montserrat']">Enviar mensagem via WhatsApp</h3>
                    <button onClick={() => setOpen(false)} className="text-[var(--text-faint)] hover:text-[var(--text-primary)] rounded-xl p-1.5 hover:bg-[var(--bg-nav-hover)] transition-all">
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                </div>
                <div className="space-y-2">
                    {loading ? (
                        <div className="py-8 text-center text-sm text-[var(--text-muted)]">Carregando templates...</div>
                    ) : templates.length === 0 ? (
                        <div className="py-8 text-center text-sm text-[var(--text-muted)]">Nenhum template encontrado.</div>
                    ) : (
                        templates.map(template => (
                            <button
                                key={template.id}
                                onClick={() => sendMessage(template.message)}
                                className="w-full text-left rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-input)] p-4 transition-all duration-200 hover:border-emerald-500/40 hover:bg-emerald-500/5"
                            >
                                <p className="text-sm font-semibold text-[var(--text-primary)]">{template.name}</p>
                                <p className="text-xs text-[var(--text-muted)] mt-1.5 line-clamp-3 whitespace-pre-wrap">{renderTemplate(template.message, installment)}</p>
                            </button>
                        ))
                    )}
                </div>
            </div>
        </div>,
        document.body
    ) : null;

    return (
        <>
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
            {modal}
        </>
    );
}
