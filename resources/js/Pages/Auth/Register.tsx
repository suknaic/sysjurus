import { FormEventHandler } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Register() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post('/register');
    };

    return (
        <div className="min-h-screen flex items-center justify-center gradient-mesh px-4">
            <Head title="Receba+ - Cadastro" />
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <img src="/icon-receba.png" alt="Receba+" className="mx-auto h-16 w-16 rounded-2xl object-contain gold-glow mb-4" />
                    <h1 className="text-3xl font-bold text-[var(--text-primary)] tracking-tight font-['Montserrat']">Receba+</h1>
                    <p className="text-sm text-[var(--text-muted)] mt-1.5 tracking-wider uppercase text-[11px]">Criar nova conta</p>
                </div>

                <div className="card-premium p-8">
                    <form onSubmit={submit} className="space-y-5">
                        <div>
                            <label className="block text-sm font-semibold text-[var(--text-secondary)] mb-1.5">Nome</label>
                            <input
                                type="text"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                className="input-premium"
                                required
                                placeholder="Seu nome completo"
                            />
                            {errors.name && <p className="mt-1.5 text-sm text-red-400 font-medium">{errors.name}</p>}
                        </div>
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
                        <div>
                            <label className="block text-sm font-semibold text-[var(--text-secondary)] mb-1.5">Confirmar Senha</label>
                            <input
                                type="password"
                                value={data.password_confirmation}
                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                className="input-premium"
                                required
                                placeholder="••••••••"
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={processing}
                            className="btn-primary w-full"
                        >
                            {processing ? (
                                <span className="flex items-center gap-2">
                                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" /></svg>
                                    Cadastrando...
                                </span>
                            ) : 'Cadastrar'}
                        </button>
                    </form>

                    <div className="mt-6 pt-6 border-t border-[var(--border-subtle)] text-center">
                        <p className="text-sm text-[var(--text-muted)]">
                            Ja tem conta?{' '}
                            <Link href="/login" className="text-[#C9A84C] hover:text-[#D4AF37] font-semibold transition-colors">
                                Entrar
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
