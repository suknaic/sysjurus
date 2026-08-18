import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

export default function VerifyEmail({ status }: { status?: string }) {
    const { post, processing } = useForm({});

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('verification.send'));
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 gradient-mesh px-4">
            <Head title="SysJuros - Verificar Email" />
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
                            Obrigado por se cadastrar! Antes de comecar, voce poderia verificar seu endereco de email clicando no link que acabamos de enviar? Se nao recebeu o email, com prazer enviaremos outro.
                        </p>
                    </div>

                    {status === 'verification-link-sent' && (
                        <div className="mb-4 rounded-xl bg-emerald-50 p-3 text-sm font-medium text-emerald-700 border border-emerald-200">
                            Um novo link de verificacao foi enviado para o email que voce forneceu durante o cadastro.
                        </div>
                    )}

                    <form onSubmit={submit} className="space-y-4">
                        <button type="submit" disabled={processing} className="btn-primary w-full">
                            {processing ? 'Reenviando...' : 'Reenviar Email de Verificacao'}
                        </button>
                    </form>

                    <div className="mt-6 pt-6 border-t border-gray-100">
                        <Link
                            href={route('logout')}
                            method="post"
                            as="button"
                            className="text-sm font-semibold text-gray-500 hover:text-gray-700 transition-colors"
                        >
                            Sair
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
