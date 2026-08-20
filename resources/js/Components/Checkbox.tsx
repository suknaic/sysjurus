import { InputHTMLAttributes } from 'react';

export default function Checkbox({
    className = '',
    ...props
}: InputHTMLAttributes<HTMLInputElement>) {
    return (
        <input
            {...props}
            type="checkbox"
            className={
                'rounded border-[var(--border-default)] text-[#C9A84C] shadow-sm focus:ring-[#C9A84C]/50 bg-[var(--bg-input)] ' +
                className
            }
        />
    );
}
