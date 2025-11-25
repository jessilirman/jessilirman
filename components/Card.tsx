import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  subtitle?: string;
  action?: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ children, className = '', title, subtitle, action }) => {
  return (
    <div className={`glass-panel rounded-xl overflow-hidden shadow-xl ${className}`}>
      {(title || action) && (
        <div className="px-6 py-5 border-b border-white/5 flex justify-between items-start">
          <div>
            {title && <h3 className="text-lg font-serif font-semibold text-white tracking-wide">{title}</h3>}
            {subtitle && <p className="mt-1 text-sm text-slate-400 font-light">{subtitle}</p>}
          </div>
          {action && <div>{action}</div>}
        </div>
      )}
      <div className="p-6">
        {children}
      </div>
    </div>
  );
};