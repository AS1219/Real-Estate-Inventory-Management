import { Outlet } from 'react-router';
import { Sidebar } from '../components/Sidebar';
import { MobileNav } from '../components/MobileNav';

export function Layout() {
  return (
    <div className="flex h-screen bg-[#F8FAFC] overflow-hidden">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <Sidebar />
      </div>
      
      {/* Mobile Navigation */}
      <div className="lg:hidden w-full">
        <MobileNav />
      </div>
      
      <main className="flex-1 overflow-y-auto pb-20 lg:pb-0">
        <Outlet />
      </main>
    </div>
  );
}