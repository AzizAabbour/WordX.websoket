import { forwardRef } from 'react';
import { classNames } from '../../utils/helpers';
import './Button.css';

const Button = forwardRef(function Button(
  { children, variant = 'primary', size = 'md', icon: Icon, iconRight: IconRight, loading, disabled, fullWidth, className, ...props },
  ref
) {
  return (
    <button
      ref={ref}
      className={classNames('btn', variant, size, fullWidth && 'full', !children && Icon && 'iconBtn', className)}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <span className="spinner" />}
      {!loading && Icon && <Icon size={size === 'sm' ? 14 : size === 'lg' ? 20 : 16} />}
      {children}
      {IconRight && <IconRight size={size === 'sm' ? 14 : 16} />}
    </button>
  );
});

export default Button;
