import React from 'react';
import { cn } from '../utils/cn';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hover?: boolean;
}

export function Card({ children, className, onClick, hover = false }: CardProps) {
  return (
    <div
      className={cn(
        'bg-white rounded-[20px] border border-[#E5E7EB]',
        'shadow-[0_1px_3px_0_rgb(0_0_0/0.1),0_1px_2px_-1px_rgb(0_0_0/0.1)]',
        hover && 'transition-all duration-200 hover:shadow-[0_4px_6px_-1px_rgb(0_0_0/0.1),0_2px_4px_-2px_rgb(0_0_0/0.1)] hover:-translate-y-0.5',
        onClick && 'cursor-pointer',
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
}

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  color?: 'primary' | 'success' | 'warning' | 'danger';
}

export function MetricCard({ title, value, icon, trend, color = 'primary' }: MetricCardProps) {
  const colors = {
    primary: 'bg-[#2563EB]/10 text-[#2563EB]',
    success: 'bg-[#16A34A]/10 text-[#16A34A]',
    warning: 'bg-[#F59E0B]/10 text-[#F59E0B]',
    danger: 'bg-[#DC2626]/10 text-[#DC2626]'
  };
  
  return (
    <Card>
      <div className="p-4 md:p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <p className="text-xs md:text-sm text-[#6B7280] mb-2">{title}</p>
            <p className="text-2xl md:text-3xl font-semibold text-[#111827] mb-2 truncate">{value}</p>
            {trend && (
              <p className={cn(
                'text-xs md:text-sm font-medium',
                trend.isPositive ? 'text-[#16A34A]' : 'text-[#DC2626]'
              )}>
                {trend.value}
              </p>
            )}
          </div>
          <div className={cn('p-2 md:p-3 rounded-[10px] flex-shrink-0', colors[color])}>
            {icon}
          </div>
        </div>
      </div>
    </Card>
  );
}