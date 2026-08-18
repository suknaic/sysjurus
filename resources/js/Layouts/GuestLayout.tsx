import { PropsWithChildren } from 'react';

export default function Guest({ children }: PropsWithChildren) {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 gradient-mesh px-4 sm:px-6">
            <div className="w-full max-w-md">
                <div className="mb-8 text-center">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl gradient-primary shadow-xl shadow-indigo-500/30 mb-4">
                        <span className="text-xl font-bold text-white">$</span>
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900 tracking-tight">SysJuros</h1>
                    <p className="text-sm text-gray-500 mt-1">Gestao Financeira</p>
                </div>
                <div className="card-premium p-8">
                    {children}
                </div>
                <p className="mt-6 text-center text-xs text-gray-400">
                    &copy; {new Date().getFullYear()} SysJuros. Todos os direitos reservados.
                </p>
            </div>
        </div>
    );
}
