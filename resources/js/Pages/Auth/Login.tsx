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
        <div className="min-h-screen flex items-center justify-center bg-gray-50 gradient-mesh px-4">
            <Head title="SysJuros - Login" />
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl gradient-primary shadow-xl shadow-indigo-500/30 mb-4">
                        <span className="text-xl font-bold text-white">$</span>
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900 tracking-tight">SysJuros</h1>
                    <p className="text-sm text-gray-500 mt-1">Gestao Financeira</p>
                </div>

                <div className="card-premium p-8">
                    {status && (
                        <div className="mb-4 rounded-xl bg-emerald-50 p-3 text-sm font-medium text-emerald-700 border border-emerald-200">
                            {status}
                        </div>
                    )}

                    <form onSubmit={submit} className="space-y-5">
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
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                checked={data.remember}
                                onChange={(e) => setData('remember', e.target.checked)}
                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                            />
                            <span className="ml-2 text-sm text-gray-600">Lembrar de mim</span>
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
                        <Link href="/forgot-password" className="block mt-4 text-center text-sm text-indigo-600 hover:text-indigo-500 font-medium">
                            Esqueceu sua senha?
                        </Link>
                    )}

                    <div className="mt-6 pt-6 border-t border-gray-100 text-center">
                        <p className="text-sm text-gray-500">
                            Nao tem conta?{' '}
                            <Link href="/register" className="text-indigo-600 hover:text-indigo-500 font-semibold">
                                Cadastre-se
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
