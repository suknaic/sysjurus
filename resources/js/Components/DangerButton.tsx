import { ButtonHTMLAttributes } from 'react';

export default function DangerButton({
    className = '',
    disabled,
    children,
    ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
    return (
        <button
            {...props}
            className={`btn-danger ${disabled && 'opacity-50 cursor-not-allowed'} ${className}`}
            disabled={disabled}
        >
            {children}
        </button>
    );
}
