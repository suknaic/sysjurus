import { ReactNode } from 'react';

interface Props {
    title: string;
    description: string;
    icon?: ReactNode;
    children?: ReactNode;
}

export default function EmptyState({ title, description, icon, children }: Props) {
    return (
        <div className="text-center py-16 px-4">
            <div className="mx-auto h-16 w-16 rounded-2xl bg-gray-100 flex items-center justify-center text-3xl mb-4">
                {icon || '📋'}
            </div>
            <h3 className="text-sm font-semibold text-gray-900">{title}</h3>
            <p className="mt-1 text-sm text-gray-500 max-w-sm mx-auto">{description}</p>
            {children && <div className="mt-6">{children}</div>}
        </div>
    );
}
