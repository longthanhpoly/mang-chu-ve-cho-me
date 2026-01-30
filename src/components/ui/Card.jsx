import React from 'react';
import './Card.css';

/**
 * Card Component
 * @param {function} onClick - Click handler
 * @param {React.ReactNode} children - Card content
 * @param {string} className - Additional CSS classes
 */
const Card = ({ 
  onClick, 
  children, 
  className = '',
  ...props 
}) => {
  const classNames = [
    'card',
    onClick ? 'card-clickable card-motion' : '',
    className
  ].filter(Boolean).join(' ');

  const handleClick = (e) => {
    if (onClick) {
      onClick(e);
    }
  };

  const handleKeyPress = (e) => {
    if (onClick && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      onClick(e);
    }
  };

  return (
    <div
      className={classNames}
      onClick={handleClick}
      onKeyPress={handleKeyPress}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
