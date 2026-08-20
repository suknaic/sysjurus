import InputError from '@/Components/InputError';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

export default function ForgotPassword({ status }: { status?: string }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('password.email'));
    };

    return (
        <div className="min-h-screen flex items-center justify-center gradient-mesh px-4">
            <Head title="Receba+ - Esqueci a Senha" />
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <img src="/icon-receba.png" alt="Receba+" className="mx-auto h-16 w-16 rounded-2xl object-contain gold-glow mb-4" />
                    <h1 className="text-3xl font-bold text-[var(--text-primary)] tracking-tight font-['Montserrat']">Receba+</h1>
                    <p className="text-sm text-[var(--text-muted)] mt-1.5 tracking-wider uppercase text-[11px]">Gestao Financeira</p>
                </div>

                <div className="card-premium p-8">
                    <div className="mb-6">
                        <h2 className="text-lg font-bold text-[var(--text-primary)]">Esqueceu sua senha?</h2>
                        <p className="mt-1 text-sm text-[var(--text-muted)]">
                            Sem problemas. Basta nos informar seu endereco de email e enviaremos um link de redefinicao de senha.
                        </p>
                    </div>

                    {status && (
                        <div className="mb-4 rounded-xl bg-emerald-500/10 p-3 text-sm font-medium text-emerald-400 border border-emerald-500/20">
                            {status}
                        </div>
                    )}

                    <form onSubmit={submit} className="space-y-5">
                        <div>
                            <label className="block text-sm font-semibold text-[var(--text-secondary)] mb-1.5">Email</label>
                            <input
                                type="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                className="input-premium"
                                required
                                placeholder="seu@email.com"
                            />
                            <InputError message={errors.email} className="mt-1.5" />
                        </div>

                        <button type="submit" disabled={processing} className="btn-primary w-full">
                            {processing ? 'Enviando...' : 'Enviar Link de Redefinicao'}
                        </button>
                    </form>

                    <div className="mt-6 pt-6 border-t border-[var(--border-subtle)] text-center">
                        <Link href="/login" className="inline-flex items-center gap-1.5 text-sm font-medium text-[#C9A84C] hover:text-[#D4AF37] transition-colors">
                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" /></svg>
                            Voltar ao login
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
