import { PropsWithChildren } from 'react';
import { useTheme } from '@/Context/ThemeContext';
import { Link } from '@inertiajs/react';

function ThemeToggle() {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className="flex items-center justify-center rounded-xl p-2 transition-all duration-300 hover:bg-[var(--bg-nav-hover)] text-[var(--text-muted)] hover:text-[var(--text-secondary)]"
            title={theme === 'dark' ? 'Modo claro' : 'Modo escuro'}
        >
            {theme === 'dark' ? (
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
                </svg>
            ) : (
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
                </svg>
            )}
        </button>
    );
}

export default function Guest({ children }: PropsWithChildren) {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center gradient-mesh px-4 sm:px-6">
            <div className="absolute top-4 right-4">
                <ThemeToggle />
            </div>
            <div className="w-full max-w-md">
                <div className="mb-8 text-center">
                    <img src="/logo-receba.png" alt="Receba+" className="mx-auto h-16 w-16 rounded-2xl object-contain gold-glow mb-4" />
                    <h1 className="text-3xl font-bold text-[var(--text-primary)] tracking-tight font-['Montserrat']">Receba+</h1>
                    <p className="text-sm text-[var(--text-muted)] mt-1.5 tracking-wider uppercase text-[11px]">Gestao Financeira</p>
                </div>
                <div className="card-premium p-8">
                    {children}
                </div>
                <p className="mt-6 text-center text-xs text-[var(--text-faint)]">
                    &copy; {new Date().getFullYear()} Receba+. Todos os direitos reservados.
                </p>
            </div>
        </div>
    );
}
