import { ReactNode, useEffect } from 'react';

interface Props {
    show: boolean;
    onClose: () => void;
    title: string;
    children: ReactNode;
    maxWidth?: 'sm' | 'md' | 'lg' | 'xl';
}

const maxWidths = { sm: 'max-w-md', md: 'max-w-lg', lg: 'max-w-2xl', xl: 'max-w-4xl' };

export default function Modal({ show, onClose, title, children, maxWidth = 'md' }: Props) {
    useEffect(() => {
        if (show) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [show]);

    if (!show) return null;

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto animate-fade-in">
            <div className="fixed inset-0 bg-[var(--bg-overlay)] backdrop-blur-sm" onClick={onClose} />
            <div className="flex min-h-full items-center justify-center p-4">
                <div className={`relative w-full ${maxWidths[maxWidth]} rounded-2xl card-premium premium-shadow-xl animate-slide-up`}>
                    <div className="flex items-center justify-between border-b border-[var(--border-subtle)] px-6 py-5">
                        <h3 className="text-lg font-bold text-[var(--text-primary)] font-['Montserrat']">{title}</h3>
                        <button onClick={onClose} className="text-[var(--text-faint)] hover:text-[var(--text-primary)] rounded-xl p-1.5 hover:bg-[var(--bg-nav-hover)] transition-all duration-300">
                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                        </button>
                    </div>
                    <div className="px-6 py-5">{children}</div>
                </div>
            </div>
        </div>
    );
}
