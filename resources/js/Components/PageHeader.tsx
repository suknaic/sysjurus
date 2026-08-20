import { ReactNode } from 'react';

interface Props {
    title: string;
    children?: ReactNode;
}

export default function PageHeader({ title, children }: Props) {
    return (
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <h1 className="text-2xl font-bold text-white tracking-tight font-['Montserrat']">{title}</h1>
            <div className="flex items-center gap-3">{children}</div>
        </div>
    );
}
