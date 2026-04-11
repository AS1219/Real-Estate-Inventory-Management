import React from 'react';
import { Search, Bell, ChevronRight } from 'lucide-react';
import { Input } from './Input';

interface TopNavProps {
  title: string;
  breadcrumbs?: { label: string; path?: string }[];
  showLiveIndicator?: boolean;
}

export function TopNav({ title, breadcrumbs, showLiveIndicator }: TopNavProps) {
  return (
    <div className="bg-white border-b border-[#E5E7EB] px-4 md:px-8 py-4 sticky top-0 lg:top-0 z-10">
      <div className="flex items-center justify-between">
        {/* Left side - Title and Breadcrumbs */}
        <div className="flex-1 min-w-0">
          {breadcrumbs && breadcrumbs.length > 0 && (
            <div className="hidden md:flex items-center gap-2 text-sm text-[#6B7280] mb-1">
              {breadcrumbs.map((crumb, index) => (
                <React.Fragment key={index}>
                  {index > 0 && <ChevronRight size={14} />}
                  <span className={index === breadcrumbs.length - 1 ? 'text-[#111827]' : ''}>
                    {crumb.label}
                  </span>
                </React.Fragment>
              ))}
            </div>
          )}
          <div className="flex items-center gap-2 md:gap-3">
            <h1 className="text-xl md:text-2xl font-semibold text-[#111827] truncate">{title}</h1>
            {showLiveIndicator && (
              <div className="flex items-center gap-1.5 md:gap-2 px-2 md:px-3 py-1 bg-[#16A34A]/10 rounded-full flex-shrink-0">
                <span className="w-1.5 md:w-2 h-1.5 md:h-2 bg-[#16A34A] rounded-full animate-pulse" />
                <span className="text-xs md:text-sm font-medium text-[#16A34A]">Live</span>
              </div>
            )}
          </div>
        </div>
        
        {/* Right side - Search and Actions */}
        <div className="flex items-center gap-2 md:gap-4 ml-4">
          <div className="hidden md:block w-80">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6B7280]" size={18} />
              <input
                type="text"
                placeholder="Search flats, projects..."
                className="w-full pl-10 pr-4 py-2 bg-[#F9FAFB] border border-[#E5E7EB] rounded-[10px] text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB]"
              />
            </div>
          </div>
          
          <button className="relative p-2 text-[#6B7280] hover:bg-[#F3F4F6] rounded-[10px] transition-all">
            <Bell size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-[#DC2626] rounded-full" />
          </button>
        </div>
      </div>
    </div>
  );
}