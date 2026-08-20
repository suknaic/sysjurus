import { Link } from '@inertiajs/react';

interface Props {
    canLogin: boolean;
}

export default function Welcome({ canLogin }: { canLogin: boolean }) {
    return (
        <div className="min-h-screen bg-gradient-to-br from-[#0A0A0A] via-[#0B1E4D] to-[#1A2B6B] flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#0B1E4D]/30 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#C9A84C]/15 rounded-full blur-3xl" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#1A2B6B]/20 rounded-full blur-3xl" />
            </div>

            <div className="relative z-10 text-center px-6 max-w-2xl">
                <img src="/icon-receba.png" alt="Receba+" className="mx-auto h-30 w-30 rounded-3xl object-contain mb-8" />

                <h1 className="text-5xl sm:text-7xl font-bold text-[var(--text-primary)] mb-4 tracking-tight font-['Montserrat']">
                    Receba<span className="bg-gradient-to-r from-[#C9A84C] to-[#D4AF37] bg-clip-text text-transparent">+</span>
                </h1>
                <p className="text-xl text-[var(--text-muted)] mb-12 font-light">
                    Sistema de Cobranca e Gestao Financeira
                </p>

                <div className="flex justify-center">
                    {canLogin && (
                        <Link href="/login" className="btn-primary text-base px-8 py-3.5 hover:scale-105">
                            Entrar
                            <svg className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
                        </Link>
                    )}
                </div>

                <div className="mt-16 grid grid-cols-3 gap-8 text-center">
                    <div>
                        <div className="text-2xl font-bold text-[var(--text-primary)] mb-1 font-['Montserrat']">100%</div>
                        <div className="text-xs text-[var(--text-muted)] uppercase tracking-wider">Seguro</div>
                    </div>
                    <div>
                        <div className="text-2xl font-bold text-[var(--text-primary)] mb-1 font-['Montserrat']">24/7</div>
                        <div className="text-xs text-[var(--text-muted)] uppercase tracking-wider">Disponivel</div>
                    </div>
                    <div>
                        <div className="text-2xl font-bold text-[var(--text-primary)] mb-1 font-['Montserrat']">GRATIS</div>
                        <div className="text-xs text-[var(--text-muted)] uppercase tracking-wider">Para comecar</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
