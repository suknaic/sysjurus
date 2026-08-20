import { FormEventHandler } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';

interface Props {
    status?: string;
    canResetPassword: boolean;
}

export default function Login({ status, canResetPassword }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post('/login');
    };

    return (
        <div className="min-h-screen flex items-center justify-center gradient-mesh px-4">
            <Head title="Receba+ - Login" />
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <img src="/icon-receba.png" alt="Receba+" className="mx-auto h-16 w-16 rounded-2xl object-contain mb-4" />
                    <h1 className="text-3xl font-bold text-[var(--text-primary)] tracking-tight font-['Montserrat']">Receba+</h1>
                    <p className="text-sm text-[var(--text-muted)] mt-1.5 tracking-wider uppercase text-[11px]">Gestao Financeira</p>
                </div>

                <div className="card-premium p-8">
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
                            {errors.email && <p className="mt-1.5 text-sm text-red-400 font-medium">{errors.email}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-[var(--text-secondary)] mb-1.5">Senha</label>
                            <input
                                type="password"
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                className="input-premium"
                                required
                                placeholder="••••••••"
                            />
                            {errors.password && <p className="mt-1.5 text-sm text-red-400 font-medium">{errors.password}</p>}
                        </div>
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                checked={data.remember}
                                onChange={(e) => setData('remember', e.target.checked)}
                                className="h-4 w-4 rounded border-[var(--border-default)] text-[#C9A84C] focus:ring-[#C9A84C]/50 bg-white/5"
                            />
                            <span className="ml-2 text-sm text-[var(--text-muted)]">Lembrar de mim</span>
                        </div>
                        <button
                            type="submit"
                            disabled={processing}
                            className="btn-primary w-full"
                        >
                            {processing ? (
                                <span className="flex items-center gap-2">
                                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" /></svg>
                                    Entrando...
                                </span>
                            ) : 'Entrar'}
                        </button>
                    </form>

                    {canResetPassword && (
                        <Link href="/forgot-password" className="block mt-4 text-center text-sm text-[#C9A84C] hover:text-[#D4AF37] font-medium transition-colors">
                            Esqueceu sua senha?
                        </Link>
                    )}

                    <div className="mt-6 pt-6 border-t border-[var(--border-subtle)] text-center">
                        <p className="text-sm text-[var(--text-muted)]">
                            Nao tem conta?{' '}
                            <Link href="/register" className="text-[#C9A84C] hover:text-[#D4AF37] font-semibold transition-colors">
                                Cadastre-se
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
