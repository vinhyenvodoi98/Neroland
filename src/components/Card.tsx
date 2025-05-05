'use client';

import { ReactNode } from 'react';

interface CardProps {
  title?: string;
  children: ReactNode;
  image?: string;
  imageAlt?: string;
  actions?: ReactNode;
  className?: string;
  variant?: 'default' | 'bordered' | 'compact' | 'hover';
  bgColor?: 'base-100' | 'base-200' | 'base-300';
}

export default function Card({
  title,
  children,
  image,
  imageAlt,
  actions,
  className = '',
  variant = 'default',
  bgColor = 'base-200'
}: CardProps) {
  const getVariantClasses = () => {
    switch (variant) {
      case 'bordered':
        return 'border border-base-300';
      case 'compact':
        return 'card-compact';
      case 'hover':
        return 'hover:shadow-lg transition-shadow duration-300';
      default:
        return '';
    }
  };

  return (
    <div className={`card bg-${bgColor} shadow-xl ${getVariantClasses()} ${className}`}>
      {image && (
        <figure className="px-4 pt-4">
          <img src={image} alt={imageAlt || title || 'Card image'} className="rounded-xl" />
        </figure>
      )}
      <div className="card-body">
        {title && <h2 className="card-title">{title}</h2>}
        {children}
        {actions && (
          <div className="card-actions justify-end">
            {actions}
          </div>
        )}
      </div>
    </div>
  );
} 