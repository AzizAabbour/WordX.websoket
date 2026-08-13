import { forwardRef } from 'react';
import { classNames } from '../../utils/helpers';
import './Input.css';

const Input = forwardRef(function Input(
  { label, error, helperText, icon: Icon, rightElement, className, id, ...props },
  ref
) {
  const inputId = id || `input-${label?.replace(/\s+/g, '-').toLowerCase()}`;

  return (
    <div className="inputGroup">
      {label && <label htmlFor={inputId} className="inputLabel">{label}</label>}
      <div className="inputWrapper">
        {Icon && <span className="inputIcon"><Icon size={16} /></span>}
        {props.type === 'textarea' ? (
          <textarea
            ref={ref}
            id={inputId}
            className={classNames('input', 'textarea', Icon && 'hasLeftIcon', error && 'hasError', className)}
            {...props}
          />
        ) : (
          <input
            ref={ref}
            id={inputId}
            className={classNames('input', Icon && 'hasLeftIcon', error && 'hasError', className)}
            {...props}
          />
        )}
        {rightElement && <span className="inputRight">{rightElement}</span>}
      </div>
      {error && <span className="errorText">{error}</span>}
      {helperText && !error && <span className="helperText">{helperText}</span>}
    </div>
  );
});

export default Input;
