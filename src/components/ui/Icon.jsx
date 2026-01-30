import React from 'react';
import './Icon.css';

/**
 * Icon Button Component
 * @param {React.ReactNode} children - Icon content (lucide-react icon)
 * @param {function} onClick - Click handler
 * @param {string} ariaLabel - Accessibility label
 * @param {string} className - Additional CSS classes
 */
const Icon = ({ 
  children, 
  onClick, 
  ariaLabel,
  className = '',
  ...props 
}) => {
  const classNames = [
    'icon-button',
    onClick ? 'icon-motion' : '',
    'touch-target',
    className
  ].filter(Boolean).join(' ');

  const handleKeyPress = (e) => {
    if (onClick && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      onClick(e);
    }
  };

  return (
    <button
      className={classNames}
      onClick={onClick}
      onKeyPress={handleKeyPress}
      aria-label={ariaLabel}
      {...props}
    >
      {children}
    </button>
  );
};

export default Icon;
