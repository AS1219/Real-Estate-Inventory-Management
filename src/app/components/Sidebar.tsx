import React from 'react';
import { Link, useLocation } from 'react-router';
import { 
  LayoutDashboard, 
  Building2, 
  Table, 
  BarChart3, 
  Bell, 
  Settings,
  Activity
} from 'lucide-react';
import { cn } from '../utils/cn';

interface NavItem {
  icon: React.ReactNode;
  label: string;
  path: string;
}

const navItems: NavItem[] = [
  { icon: <LayoutDashboard size={20} />, label: 'Dashboard', path: '/' },
  { icon: <Building2 size={20} />, label: 'Projects', path: '/projects' },
  { icon: <Table size={20} />, label: 'Inventory', path: '/inventory' },
  { icon: <BarChart3 size={20} />, label: 'Analytics', path: '/analytics' },
  { icon: <Activity size={20} />, label: 'Activity', path: '/activity' },
];

export function Sidebar() {
  const location = useLocation();
  
  return (
    <aside className="w-64 h-screen bg-white border-r border-[#E5E7EB] flex flex-col sticky top-0">
      {/* Logo */}
      <div className="p-6 border-b border-[#E5E7EB]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-[#2563EB] to-[#1D4ED8] rounded-[10px] flex items-center justify-center">
            <Building2 className="text-white" size={24} />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-[#111827]">RealEstate</h1>
            <p className="text-xs text-[#6B7280]">Inventory Manager</p>
          </div>
        </div>
      </div>
      
      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
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
      </nav>
      
      {/* Bottom Actions */}
      <div className="p-4 border-t border-[#E5E7EB] space-y-1">
        <Link
          to="/notifications"
          className="flex items-center gap-3 px-4 py-3 rounded-[10px] text-[#6B7280] hover:bg-[#F3F4F6] hover:text-[#111827] transition-all duration-200"
        >
          <Bell size={20} />
          <span>Notifications</span>
          <span className="ml-auto bg-[#DC2626] text-white text-xs px-2 py-0.5 rounded-full">3</span>
        </Link>
        <Link
          to="/settings"
          className="flex items-center gap-3 px-4 py-3 rounded-[10px] text-[#6B7280] hover:bg-[#F3F4F6] hover:text-[#111827] transition-all duration-200"
        >
          <Settings size={20} />
          <span>Settings</span>
        </Link>
      </div>
      
      {/* User Profile */}
      <div className="p-4 border-t border-[#E5E7EB]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-[#8B5CF6] to-[#7C3AED] rounded-full flex items-center justify-center text-white font-medium">
            RS
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-[#111827] truncate">Rahul Sharma</p>
            <p className="text-xs text-[#6B7280] truncate">Sales Agent</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
