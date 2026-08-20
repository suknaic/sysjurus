import InputError from '@/Components/InputError';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

export default function ResetPassword({
    token,
    email,
}: {
    token: string;
    email: string;
}) {
    const { data, setData, post, processing, errors, reset } = useForm({
        token: token,
        email: email,
        password: '',
        password_confirmation: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('password.store'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <div className="min-h-screen flex items-center justify-center gradient-mesh px-4">
            <Head title="Receba+ - Redefinir Senha" />
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <img src="/icon-receba.png" alt="Receba+" className="mx-auto h-16 w-16 rounded-2xl object-contain gold-glow mb-4" />
                    <h1 className="text-3xl font-bold text-[var(--text-primary)] tracking-tight font-['Montserrat']">Receba+</h1>
                    <p className="text-sm text-[var(--text-muted)] mt-1.5 tracking-wider uppercase text-[11px]">Gestao Financeira</p>
                </div>

                <div className="card-premium p-8">
                    <div className="mb-6">
                        <h2 className="text-lg font-bold text-[var(--text-primary)]">Redefinir Senha</h2>
                        <p className="mt-1 text-sm text-[var(--text-muted)]">
                            Insira sua nova senha abaixo.
                        </p>
                    </div>

                    <form onSubmit={submit} className="space-y-5">
                        <div>
                            <label className="block text-sm font-semibold text-[var(--text-secondary)] mb-1.5">Email</label>
                            <input
                                type="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                className="input-premium"
                                autoComplete="username"
                                required
                            />
                            <InputError message={errors.email} className="mt-1.5" />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-[var(--text-secondary)] mb-1.5">Nova Senha</label>
                            <input
                                type="password"
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                className="input-premium"
                                autoComplete="new-password"
                                required
                            />
                            <InputError message={errors.password} className="mt-1.5" />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-[var(--text-secondary)] mb-1.5">Confirmar Senha</label>
                            <input
                                type="password"
                                value={data.password_confirmation}
                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                className="input-premium"
                                autoComplete="new-password"
                                required
                            />
                            <InputError message={errors.password_confirmation} className="mt-1.5" />
                        </div>

                        <button type="submit" disabled={processing} className="btn-primary w-full">
                            {processing ? 'Redefinindo...' : 'Redefinir Senha'}
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
