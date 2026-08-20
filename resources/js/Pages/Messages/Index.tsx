import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PageHeader from '@/Components/PageHeader';
import FlashMessage from '@/Components/FlashMessage';
import Modal from '@/Components/Modal';
import EmptyState from '@/Components/EmptyState';
import { Head, router } from '@inertiajs/react';
import { PageProps, MessageTemplate } from '@/types';
import { useState } from 'react';

interface Props extends PageProps {
    templates: MessageTemplate[];
}

const categoryLabels: Record<string, string> = {
    lembrete: 'Lembrete',
    cobranca: 'Cobrança',
    aviso_final: 'Aviso Final',
    custom: 'Personalizado',
};

const categoryColors: Record<string, string> = {
    lembrete: 'bg-blue-500/10 text-blue-400',
    cobranca: 'bg-amber-500/10 text-amber-400',
    aviso_final: 'bg-red-500/10 text-red-400',
    custom: 'bg-[var(--bg-input)] text-[var(--text-muted)]',
};

const templateVars = [
    { key: 'nome_cliente', label: 'Nome do Cliente' },
    { key: 'codigo_contrato', label: 'Código do Contrato' },
    { key: 'numero_parcela', label: 'Número da Parcela' },
    { key: 'valor_parcela', label: 'Valor da Parcela' },
    { key: 'valor_pago', label: 'Valor Pago' },
    { key: 'valor_restante', label: 'Valor Restante' },
    { key: 'data_vencimento', label: 'Data de Vencimento' },
    { key: 'dias_atraso', label: 'Dias em Atraso' },
    { key: 'data_hoje', label: 'Data de Hoje' },
    { key: 'telefone_cliente', label: 'Telefone do Cliente' },
];

const emptyForm = { name: '', category: 'lembrete', message: '' };

export default function MessagesIndex({ templates }: Props) {
    const [showModal, setShowModal] = useState(false);
    const [editing, setEditing] = useState<MessageTemplate | null>(null);
    const [form, setForm] = useState(emptyForm);
    const [deleting, setDeleting] = useState<MessageTemplate | null>(null);

    const openCreate = () => {
        setEditing(null);
        setForm(emptyForm);
        setShowModal(true);
    };

    const openEdit = (t: MessageTemplate) => {
        setEditing(t);
        setForm({ name: t.name, category: t.category, message: t.message });
        setShowModal(true);
    };

    const submit = () => {
        if (editing) {
            router.put(`/message-templates/${editing.id}`, form, {
                onSuccess: () => { setShowModal(false); setEditing(null); setForm(emptyForm); },
            });
        } else {
            router.post('/message-templates', form, {
                onSuccess: () => { setShowModal(false); setForm(emptyForm); },
            });
        }
    };

    const confirmDelete = (t: MessageTemplate) => {
        setDeleting(t);
    };

    const executeDelete = () => {
        if (!deleting) return;
        router.delete(`/message-templates/${deleting.id}`, {
            onSuccess: () => setDeleting(null),
        });
    };

    const toggleActive = (t: MessageTemplate) => {
        router.put(`/message-templates/${t.id}`, { is_active: !t.is_active });
    };

    const insertVar = (key: string) => {
        setForm({ ...form, message: form.message + '{{' + key + '}}' });
    };

    return (
        <AuthenticatedLayout header={<h2 className="text-xl font-bold text-[var(--text-primary)] tracking-tight font-['Montserrat']">Mensagens</h2>}>
            <Head title="Receba+ - Mensagens" />
            <FlashMessage />

            <PageHeader title="Templates de Mensagem">
                <button onClick={openCreate} className="btn-primary">
                    <svg className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
                    Novo Template
                </button>
            </PageHeader>

            <div className="mb-6 rounded-xl bg-emerald-500/10 border border-emerald-500/20 p-4">
                <p className="text-sm text-emerald-400 font-medium">
                    Utilize os botões de <strong>WhatsApp</strong> nas páginas de Vencimentos e Detalhes do Contrato para enviar mensagens aos clientes com os templates criados aqui.
                </p>
            </div>

            <div className="card-premium overflow-hidden">
                {templates.length === 0 ? (
                    <EmptyState title="Nenhum template" description="Crie seu primeiro template de mensagem para usar no WhatsApp." />
                ) : (
                    <div className="divide-y divide-[var(--border-subtle)]">
                        {templates.map(template => (
                            <div key={template.id} className="px-5 py-4 flex items-start justify-between gap-4 hover:bg-[var(--bg-input)] transition-colors">
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1">
                                        <p className="text-sm font-bold text-[var(--text-primary)]">{template.name}</p>
                                        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${categoryColors[template.category] ?? 'bg-[var(--bg-input)] text-[var(--text-muted)]'}`}>
                                            {categoryLabels[template.category] ?? template.category}
                                        </span>
                                        {!template.is_active && (
                                            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[var(--bg-input)] text-[var(--text-faint)]">Inativo</span>
                                        )}
                                    </div>
                                    <p className="text-xs text-[var(--text-muted)] line-clamp-2 whitespace-pre-wrap">{template.message}</p>
                                </div>
                                <div className="flex items-center gap-1.5 shrink-0">
                                    <button onClick={() => toggleActive(template)} className="rounded-lg p-1.5 text-[var(--text-faint)] hover:text-amber-400 hover:bg-amber-500/10 transition-colors" title={template.is_active ? 'Desativar' : 'Ativar'}>
                                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                            {template.is_active
                                                ? <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
                                                : <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
                                            }
                                        </svg>
                                    </button>
                                    <button onClick={() => openEdit(template)} className="rounded-lg p-1.5 text-[var(--text-faint)] hover:text-[#C9A84C] hover:bg-[#C9A84C]/10 transition-colors" title="Editar">
                                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" /></svg>
                                    </button>
                                    {template.category === 'custom' && (
                                        <button onClick={() => confirmDelete(template)} className="rounded-lg p-1.5 text-[var(--text-faint)] hover:text-red-400 hover:bg-red-500/10 transition-colors" title="Remover">
                                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" /></svg>
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <Modal show={showModal} onClose={() => { setShowModal(false); setEditing(null); }} title={editing ? 'Editar Template' : 'Novo Template'}>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-semibold text-[var(--text-secondary)] mb-1.5">Nome</label>
                        <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="input-premium" placeholder="Ex: Lembrete de Vencimento" />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-[var(--text-secondary)] mb-1.5">Categoria</label>
                        <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="select-premium">
                            <option value="lembrete">Lembrete</option>
                            <option value="cobranca">Cobrança</option>
                            <option value="aviso_final">Aviso Final</option>
                            <option value="custom">Personalizado</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-[var(--text-secondary)] mb-1.5">Mensagem</label>
                        <textarea rows={6} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="input-premium resize-none" placeholder="Olá {{nome_cliente}}, sua parcela..." />
                    </div>
                    <div>
                        <p className="text-xs font-semibold text-[var(--text-muted)] mb-2">Inserir variável:</p>
                        <div className="flex flex-wrap gap-1.5">
                            {templateVars.map(v => (
                                <button key={v.key} type="button" onClick={() => insertVar(v.key)} className="text-[10px] font-semibold px-2 py-1 rounded-lg bg-[var(--bg-input)] text-[var(--text-muted)] hover:bg-[#C9A84C]/10 hover:text-[#C9A84C] transition-colors border border-[var(--border-subtle)]">
                                    {v.label}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="flex justify-end gap-3 pt-4 border-t border-[var(--border-subtle)]">
                        <button onClick={() => { setShowModal(false); setEditing(null); }} className="btn-secondary">Cancelar</button>
                        <button onClick={submit} className="btn-primary">{editing ? 'Salvar' : 'Criar'}</button>
                    </div>
                </div>
            </Modal>

            <Modal show={!!deleting} onClose={() => setDeleting(null)} title="Confirmar Exclusão">
                <p className="text-sm text-[var(--text-muted)] mb-6">
                    Tem certeza que deseja remover o template <strong className="text-[var(--text-primary)]">{deleting?.name}</strong>? Esta ação não pode ser desfeita.
                </p>
                <div className="flex justify-end gap-3">
                    <button onClick={() => setDeleting(null)} className="btn-secondary">Cancelar</button>
                    <button onClick={executeDelete} className="btn-danger">Remover</button>
                </div>
            </Modal>
        </AuthenticatedLayout>
    );
}
