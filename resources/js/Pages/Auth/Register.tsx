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
        <div className="min-h-screen flex items-center justify-center bg-gray-50 gradient-mesh px-4">
            <Head title="SysJuros - Cadastro" />
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl gradient-primary shadow-xl shadow-indigo-500/30 mb-4">
                        <span className="text-xl font-bold text-white">$</span>
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900 tracking-tight">SysJuros</h1>
                    <p className="text-sm text-gray-500 mt-1">Criar nova conta</p>
                </div>

                <div className="card-premium p-8">
                    <form onSubmit={submit} className="space-y-5">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Nome</label>
                            <input
                                type="text"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                className="input-premium"
                                required
                                placeholder="Seu nome completo"
                            />
                            {errors.name && <p className="mt-1.5 text-sm text-red-500 font-medium">{errors.name}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email</label>
                            <input
                                type="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                className="input-premium"
                                required
                                placeholder="seu@email.com"
                            />
                            {errors.email && <p className="mt-1.5 text-sm text-red-500 font-medium">{errors.email}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Senha</label>
                            <input
                                type="password"
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                className="input-premium"
                                required
                                placeholder="••••••••"
                            />
                            {errors.password && <p className="mt-1.5 text-sm text-red-500 font-medium">{errors.password}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Confirmar Senha</label>
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

                    <div className="mt-6 pt-6 border-t border-gray-100 text-center">
                        <p className="text-sm text-gray-500">
                            Ja tem conta?{' '}
                            <Link href="/login" className="text-indigo-600 hover:text-indigo-500 font-semibold">
                                Entrar
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
