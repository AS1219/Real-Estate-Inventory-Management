import React from 'react';
import { cn } from '../utils/cn';
import type { FlatStatus } from '../types';

interface StatusBadgeProps {
  status: FlatStatus;
  size?: 'sm' | 'md';
  showDot?: boolean;
}

export function StatusBadge({ status, size = 'md', showDot = true }: StatusBadgeProps) {
  const styles = {
    available: {
      bg: 'bg-[#16A34A]/10',
      text: 'text-[#16A34A]',
      dot: 'bg-[#16A34A]',
      label: 'Available'
    },
    blocked: {
      bg: 'bg-[#F59E0B]/10',
      text: 'text-[#F59E0B]',
      dot: 'bg-[#F59E0B]',
      label: 'Blocked'
    },
    sold: {
      bg: 'bg-[#DC2626]/10',
      text: 'text-[#DC2626]',
      dot: 'bg-[#DC2626]',
      label: 'Sold'
    }
  };
  
  const style = styles[status];
  const sizeClasses = size === 'sm' ? 'px-2 py-1 text-xs' : 'px-3 py-1.5 text-sm';
  
  return (
    <span className={cn(
      'inline-flex items-center gap-1.5 rounded-full font-medium',
      style.bg,
      style.text,
      sizeClasses
    )}>
      {showDot && <span className={cn('w-1.5 h-1.5 rounded-full', style.dot)} />}
      {style.label}
    </span>
  );
}
