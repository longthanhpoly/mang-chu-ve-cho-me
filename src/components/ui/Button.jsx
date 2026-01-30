import React from 'react';
import './Button.css';

/**
 * Button Component
 * @param {string} variant - 'primary' | 'secondary' | 'outline'
 * @param {string} size - 'small' | 'medium' | 'large'
 * @param {boolean} disabled - Disabled state
 * @param {function} onClick - Click handler
 * @param {React.ReactNode} children - Button content
 * @param {string} className - Additional CSS classes
 */
const Button = ({ 
  variant = 'primary', 
  size = 'medium', 
  disabled = false,
  onClick,
  children,
  className = '',
  ...props 
}) => {
  const classNames = [
    'btn',
    `btn-${variant}`,
    `btn-${size}`,
    'btn-motion',
    'touch-target',
    className
  ].filter(Boolean).join(' ');

  return (
    <button
      className={classNames}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
