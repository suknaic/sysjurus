import InputError from '@/Components/InputError';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

export default function ConfirmPassword() {
    const { data, setData, post, processing, errors, reset } = useForm({
        password: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('password.confirm'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 gradient-mesh px-4">
            <Head title="SysJuros - Confirmar Senha" />
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl gradient-primary shadow-xl shadow-indigo-500/30 mb-4">
                        <span className="text-xl font-bold text-white">$</span>
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900 tracking-tight">SysJuros</h1>
                    <p className="text-sm text-gray-500 mt-1">Gestao Financeira</p>
                </div>

                <div className="card-premium p-8">
                    <div className="mb-6">
                        <p className="text-sm text-gray-500">
                            Esta e uma area segura da aplicacao. Por favor, confirme sua senha antes de continuar.
                        </p>
                    </div>

                    <form onSubmit={submit} className="space-y-5">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Senha</label>
                            <input
                                type="password"
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                className="input-premium"
                                required
                                autoFocus
                                placeholder="••••••••"
                            />
                            <InputError message={errors.password} className="mt-1.5" />
                        </div>

                        <button type="submit" disabled={processing} className="btn-primary w-full">
                            {processing ? 'Confirmando...' : 'Confirmar'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
