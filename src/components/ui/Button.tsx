import { forwardRef } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  as?: 'button' | 'a';
  href?: string;
  target?: string;
  rel?: string;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-accent text-text-primary hover:shadow-[0_0_30px_var(--accent-glow)] hover:scale-[1.02] active:scale-[0.98] active:duration-100',
  secondary:
    'bg-transparent border border-border-subtle text-text-primary hover:border-[rgba(245,240,230,0.25)]',
  ghost:
    'bg-transparent border border-border-subtle text-text-primary hover:border-accent hover:text-accent',
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-5 py-2.5 text-xs',
  md: 'px-7 py-3.5 text-sm',
  lg: 'px-8 py-4 text-base',
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', as = 'button', className = '', children, ...props }, ref) => {
    const classes = `inline-flex items-center justify-center gap-2 rounded-full font-heading font-semibold transition-all duration-300 ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

    if (as === 'a') {
      return (
        <a
          className={classes}
          href={props.href}
          target={props.target}
          rel={props.rel}
          {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          {children}
        </a>
      );
    }

    return (
      <button ref={ref} className={classes} {...props}>
        {children}
      </button>
    );
  },
);

Button.displayName = 'Button';

export default Button;
