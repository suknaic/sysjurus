import { usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { PageProps } from '@/types';

export default function FlashMessage() {
    const { flash } = usePage<PageProps>().props;
    const [visible, setVisible] = useState(false);
    const [message, setMessage] = useState('');
    const [type, setType] = useState<'success' | 'error'>('success');

    useEffect(() => {
        if (flash.success) {
            setMessage(flash.success);
            setType('success');
            setVisible(true);
        } else if (flash.error) {
            setMessage(flash.error);
            setType('error');
            setVisible(true);
        }

        if (flash.success || flash.error) {
            const timer = setTimeout(() => setVisible(false), 4000);
            return () => clearTimeout(timer);
        }
    }, [flash]);

    if (!visible) return null;

    return (
        <div className={`fixed top-4 right-4 z-[60] rounded-xl p-4 premium-shadow-lg animate-slide-in-right ${
            type === 'success'
                ? 'bg-emerald-50 border border-emerald-200 text-emerald-800'
                : 'bg-red-50 border border-red-200 text-red-800'
        }`}>
            <div className="flex items-center gap-3">
                <div className={`flex h-6 w-6 items-center justify-center rounded-full ${
                    type === 'success' ? 'bg-emerald-500' : 'bg-red-500'
                }`}>
                    <span className="text-white text-xs font-bold">{type === 'success' ? '✓' : '✕'}</span>
                </div>
                <span className="text-sm font-semibold">{message}</span>
                <button onClick={() => setVisible(false)} className="ml-2 opacity-50 hover:opacity-100 transition-opacity rounded-lg p-0.5 hover:bg-black/5">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
            </div>
        </div>
    );
}
