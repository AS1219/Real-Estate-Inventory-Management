import React from 'react';
import { cn } from '../utils/cn';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export function Input({ label, error, className, ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="text-sm font-medium text-[#111827]">
          {label}
        </label>
      )}
      <input
        className={cn(
          'w-full px-4 py-2.5 bg-white border border-[#E5E7EB] rounded-[10px]',
          'text-[#111827] placeholder:text-[#6B7280]',
          'focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB]',
          'transition-all duration-200',
          error && 'border-[#DC2626] focus:ring-[#DC2626]/20 focus:border-[#DC2626]',
          className
        )}
        {...props}
      />
      {error && (
        <span className="text-sm text-[#DC2626]">{error}</span>
      )}
    </div>
  );
}
