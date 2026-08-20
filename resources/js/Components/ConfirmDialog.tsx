import Modal from '@/Components/Modal';

interface Props {
    show: boolean;
    title: string;
    message: string;
    confirmLabel?: string;
    cancelLabel?: string;
    danger?: boolean;
    onConfirm: () => void;
    onClose: () => void;
}

export default function ConfirmDialog({
    show,
    title,
    message,
    confirmLabel = 'Confirmar',
    cancelLabel = 'Cancelar',
    danger = true,
    onConfirm,
    onClose,
}: Props) {
    return (
        <Modal show={show} onClose={onClose} title={title} maxWidth="sm">
            <div className="space-y-5">
                <div className="flex items-start gap-3">
                    <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                        danger ? 'bg-red-500/10 text-red-400' : 'bg-[#C9A84C]/10 text-[#C9A84C]'
                    }`}>
                        {danger ? (
                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                            </svg>
                        ) : (
                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                            </svg>
                        )}
                    </div>
                    <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{message}</p>
                </div>
                <div className="flex justify-end gap-3 pt-4 border-t border-[var(--border-subtle)]">
                    <button onClick={onClose} className="btn-secondary">{cancelLabel}</button>
                    {danger ? (
                        <button onClick={onConfirm} className="btn-danger">{confirmLabel}</button>
                    ) : (
                        <button onClick={onConfirm} className="btn-primary">{confirmLabel}</button>
                    )}
                </div>
            </div>
        </Modal>
    );
}