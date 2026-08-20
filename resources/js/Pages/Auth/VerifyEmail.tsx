import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

export default function VerifyEmail({ status }: { status?: string }) {
    const { post, processing } = useForm({});

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('verification.send'));
    };

    return (
        <div className="min-h-screen flex items-center justify-center gradient-mesh px-4">
            <Head title="Receba+ - Verificar Email" />
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <img src="/icon-receba.png" alt="Receba+" className="mx-auto h-16 w-16 rounded-2xl object-contain gold-glow mb-4" />
                    <h1 className="text-3xl font-bold text-[var(--text-primary)] tracking-tight font-['Montserrat']">Receba+</h1>
                    <p className="text-sm text-[var(--text-muted)] mt-1.5 tracking-wider uppercase text-[11px]">Gestao Financeira</p>
                </div>

                <div className="card-premium p-8">
                    <div className="mb-6">
                        <p className="text-sm text-[var(--text-muted)]">
                            Obrigado por se cadastrar! Antes de comecar, voce poderia verificar seu endereco de email clicando no link que acabamos de enviar?
                        </p>
                    </div>

                    {status === 'verification-link-sent' && (
                        <div className="mb-4 rounded-xl bg-emerald-500/10 p-3 text-sm font-medium text-emerald-400 border border-emerald-500/20">
                            Um novo link de verificacao foi enviado para o email que voce forneceu durante o cadastro.
                        </div>
                    )}

                    <form onSubmit={submit} className="space-y-4">
                        <button type="submit" disabled={processing} className="btn-primary w-full">
                            {processing ? 'Reenviando...' : 'Reenviar Email de Verificacao'}
                        </button>
                    </form>

                    <div className="mt-6 pt-6 border-t border-[var(--border-subtle)]">
                        <Link
                            href={route('logout')}
                            method="post"
                            as="button"
                            className="text-sm font-semibold text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
                        >
                            Sair
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
