import { Link } from '@inertiajs/react';

interface Props {
    canLogin: boolean;
    canRegister: boolean;
}

export default function Welcome({ canLogin, canRegister }: Props) {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-950 via-indigo-950 to-violet-950 flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet-500/20 rounded-full blur-3xl" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-3xl" />
            </div>

            <div className="relative z-10 text-center px-6 max-w-2xl">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-white/10 backdrop-blur-sm border border-white/20 mb-8 shadow-2xl">
                    <span className="text-3xl font-bold text-white">$</span>
                </div>

                <h1 className="text-5xl sm:text-7xl font-bold text-white mb-4 tracking-tight">
                    Sys<span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">Juros</span>
                </h1>
                <p className="text-xl text-gray-300 mb-12 font-light">
                    Sistema de Cobranca e Gestao Financeira
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    {canLogin && (
                        <Link href="/login" className="inline-flex items-center justify-center rounded-2xl bg-white px-8 py-3.5 text-sm font-bold text-gray-900 shadow-2xl hover:bg-gray-100 transition-all duration-300 hover:shadow-white/20 hover:scale-105">
                            Entrar
                            <svg className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
                        </Link>
                    )}
                    {canRegister && (
                        <Link href="/register" className="inline-flex items-center justify-center rounded-2xl border-2 border-white/20 px-8 py-3.5 text-sm font-bold text-white backdrop-blur-sm hover:bg-white/10 transition-all duration-300 hover:border-white/40 hover:scale-105">
                            Cadastrar
                        </Link>
                    )}
                </div>

                <div className="mt-16 grid grid-cols-3 gap-8 text-center">
                    <div>
                        <div className="text-2xl font-bold text-white mb-1">100%</div>
                        <div className="text-xs text-gray-400 uppercase tracking-wider">Seguro</div>
                    </div>
                    <div>
                        <div className="text-2xl font-bold text-white mb-1">24/7</div>
                        <div className="text-xs text-gray-400 uppercase tracking-wider">Disponivel</div>
                    </div>
                    <div>
                        <div className="text-2xl font-bold text-white mb-1">GRATIS</div>
                        <div className="text-xs text-gray-400 uppercase tracking-wider">Para comecar</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
