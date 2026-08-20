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
        <div className="min-h-screen flex items-center justify-center gradient-mesh px-4">
            <Head title="Receba+ - Confirmar Senha" />
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <img src="/icon-receba.png" alt="Receba+" className="mx-auto h-16 w-16 rounded-2xl object-contain gold-glow mb-4" />
                    <h1 className="text-3xl font-bold text-[var(--text-primary)] tracking-tight font-['Montserrat']">Receba+</h1>
                    <p className="text-sm text-[var(--text-muted)] mt-1.5 tracking-wider uppercase text-[11px]">Gestao Financeira</p>
                </div>

                <div className="card-premium p-8">
                    <div className="mb-6">
                        <p className="text-sm text-[var(--text-muted)]">
                            Esta e uma area segura da aplicacao. Por favor, confirme sua senha antes de continuar.
                        </p>
                    </div>

                    <form onSubmit={submit} className="space-y-5">
                        <div>
                            <label className="block text-sm font-semibold text-[var(--text-secondary)] mb-1.5">Senha</label>
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
