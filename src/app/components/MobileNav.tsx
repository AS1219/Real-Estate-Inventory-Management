import React, { useState } from 'react';
import { Link, useLocation } from 'react-router';
import { 
  LayoutDashboard, 
  Building2, 
  Table, 
  BarChart3, 
  Activity,
  Menu,
  X
} from 'lucide-react';
import { cn } from '../utils/cn';

const navItems = [
  { icon: <LayoutDashboard size={20} />, label: 'Dashboard', path: '/' },
  { icon: <Building2 size={20} />, label: 'Projects', path: '/projects' },
  { icon: <Table size={20} />, label: 'Inventory', path: '/inventory' },
  { icon: <BarChart3 size={20} />, label: 'Analytics', path: '/analytics' },
  { icon: <Activity size={20} />, label: 'Activity', path: '/activity' },
];

export function MobileNav() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <>
      {/* Mobile Header */}
      <div className="lg:hidden sticky top-0 z-50 bg-white border-b border-[#E5E7EB] px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-[#2563EB] to-[#1D4ED8] rounded-[10px] flex items-center justify-center">
              <Building2 className="text-white" size={24} />
            </div>
            <div>
              <h1 className="text-base font-semibold text-[#111827]">RealEstate</h1>
              <p className="text-xs text-[#6B7280]">Inventory Manager</p>
            </div>
          </div>
          
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 hover:bg-[#F3F4F6] rounded-[10px]"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="absolute top-[61px] left-0 right-0 bg-white border-b border-[#E5E7EB] p-4 space-y-1"
            onClick={(e) => e.stopPropagation()}
          >
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    'flex items-center gap-3 px-4 py-3 rounded-[10px] transition-all duration-200',
                    isActive
                      ? 'bg-[#2563EB]/10 text-[#2563EB] font-medium'
                      : 'text-[#6B7280] hover:bg-[#F3F4F6] hover:text-[#111827]'
                  )}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      )}
      
      {/* Bottom Navigation for Mobile */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-[#E5E7EB] z-50">
        <div className="flex items-center justify-around px-2 py-2">
          {navItems.slice(0, 5).map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  'flex flex-col items-center gap-1 px-3 py-2 rounded-[10px] transition-all min-w-0',
                  isActive
                    ? 'text-[#2563EB]'
                    : 'text-[#6B7280]'
                )}
              >
                {item.icon}
                <span className="text-xs truncate">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}
