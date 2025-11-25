import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  icon?: string;
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  icon, 
  isLoading, 
  className = '', 
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center px-6 py-2.5 text-sm font-medium transition-all duration-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed tracking-wide uppercase font-sans";
  
  const variants = {
    primary: "bg-gradient-to-r from-amber-500 to-amber-700 hover:from-amber-400 hover:to-amber-600 text-white shadow-lg shadow-amber-900/20 focus:ring-amber-500 border border-transparent",
    secondary: "bg-slate-800 text-slate-200 border border-slate-600 hover:bg-slate-700 hover:border-slate-500 focus:ring-slate-500",
    danger: "bg-red-900/80 text-red-100 border border-red-800 hover:bg-red-800 focus:ring-red-500",
    ghost: "text-slate-400 hover:text-white hover:bg-white/5 focus:ring-slate-500"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className}`}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? (
        <span className="material-symbols-outlined animate-spin text-lg mr-2">progress_activity</span>
      ) : icon ? (
        <span className="material-symbols-outlined text-lg mr-2">{icon}</span>
      ) : null}
      {children}
    </button>
  );
};