/**
 * Button — Mini CRM UI
 * Reusable button with multiple variants, sizes, and icon support.
 */

import React from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  icon?: React.ReactNode;
  children?: React.ReactNode;
}

const VARIANT_STYLES: Record<ButtonVariant, string> = {
  primary: `
    bg-[var(--color-accent)] hover:bg-[var(--color-accent-light)]
    text-white shadow-md hover:shadow-lg
    hover:shadow-[0_4px_16px_rgba(108,99,255,0.4)]
  `,
  secondary: `
    bg-[var(--color-card)] hover:bg-[var(--color-card-hover)]
    text-[var(--color-text)] border border-[var(--color-border)]
    hover:border-[var(--color-accent)]
  `,
  ghost: `
    bg-transparent hover:bg-[var(--color-card)]
    text-[var(--color-text-muted)] hover:text-[var(--color-text)]
  `,
  danger: `
    bg-red-500/10 hover:bg-red-500/20
    text-red-400 hover:text-red-300
    border border-red-500/30 hover:border-red-400
  `,
};

const SIZE_STYLES: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-xs gap-1.5',
  md: 'px-4 py-2 text-sm gap-2',
  lg: 'px-5 py-2.5 text-base gap-2.5',
};

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  loading = false,
  icon,
  children,
  className = '',
  disabled,
  ...rest
}) => {
  const isDisabled = disabled || loading;

  return (
    <button
      disabled={isDisabled}
      className={`
        inline-flex items-center justify-center font-medium rounded-[var(--radius-md)]
        transition-all duration-[var(--transition-fast)]
        cursor-pointer select-none
        disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none
        ${VARIANT_STYLES[variant]}
        ${SIZE_STYLES[size]}
        ${className}
      `}
      {...rest}
    >
      {loading ? (
        <svg
          className="animate-spin w-4 h-4"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12" cy="12" r="10"
            stroke="currentColor" strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v8H4z"
          />
        </svg>
      ) : (
        icon
      )}
      {children && <span>{children}</span>}
    </button>
  );
};
