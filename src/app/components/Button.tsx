import React from 'react';
import { cn } from '../utils/cn';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export function Button({ 
  variant = 'primary', 
  size = 'md', 
  className, 
  children, 
  ...props 
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center gap-2 rounded-[10px] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-[#2563EB] text-white hover:bg-[#1D4ED8] shadow-sm',
    secondary: 'bg-[#F3F4F6] text-[#111827] hover:bg-[#E5E7EB]',
    outline: 'border border-[#E5E7EB] bg-white text-[#111827] hover:bg-[#F9FAFB]',
    ghost: 'text-[#111827] hover:bg-[#F3F4F6]',
    danger: 'bg-[#DC2626] text-white hover:bg-[#B91C1C] shadow-sm'
  };
  
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2',
    lg: 'px-6 py-3'
  };
  
  return (
    <button
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </button>
  );
}
