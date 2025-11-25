import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; // Will use HashRouter in App
import { User } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  user: User;
  onLogout: () => void;
}

interface NavItemProps {
  to: string;
  icon: string;
  label: string;
  active: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ to, icon, label, active }) => {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate(to)}
      className={`w-full flex items-center px-4 py-3 mb-1 text-sm font-medium transition-all duration-200 rounded-r-full border-l-4 ${
        active
          ? 'border-amber-500 bg-gradient-to-r from-amber-500/10 to-transparent text-amber-400'
          : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
      }`}
    >
      <span className={`material-symbols-outlined mr-3 ${active ? 'fill-current' : ''}`}>{icon}</span>
      {label}
    </button>
  );
};

export const Layout: React.FC<LayoutProps> = ({ children, user, onLogout }) => {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const menuItems = [
    { path: '/', icon: 'dashboard', label: 'Dashboard' },
    { path: '/finance', icon: 'payments', label: 'Receitas & Honorários' },
    { path: '/users', icon: 'group', label: 'Equipe & Permissões' },
    { path: '/integrations', icon: 'hub', label: 'Integrações' },
    { path: '/logs', icon: 'history_edu', label: 'Auditoria' },
    { path: '/settings', icon: 'settings', label: 'Configurações' },
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-navy-900 text-slate-200 font-sans">
      {/* Sidebar */}
      <aside 
        className={`${sidebarOpen ? 'w-72' : 'w-20'} flex-shrink-0 bg-navy-950 border-r border-white/5 transition-all duration-300 flex flex-col z-20`}
      >
        <div className="h-20 flex items-center justify-center border-b border-white/5 relative">
            {sidebarOpen ? (
                <div className="text-center">
                    <h1 className="font-serif text-xl font-bold text-white tracking-widest">JML</h1>
                    <span className="text-[0.6rem] uppercase tracking-[0.2em] text-amber-500 block">Sociedade de Advogados</span>
                </div>
            ) : (
                <h1 className="font-serif text-xl font-bold text-amber-500">J</h1>
            )}
            <button 
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 bg-navy-800 rounded-full p-1 border border-white/10 hover:border-amber-500 transition-colors"
            >
                <span className="material-symbols-outlined text-xs text-slate-300">
                    {sidebarOpen ? 'chevron_left' : 'chevron_right'}
                </span>
            </button>
        </div>

        <nav className="flex-1 py-6 space-y-2 overflow-y-auto">
          {menuItems.map((item) => (
            <NavItem
              key={item.path}
              to={item.path}
              icon={item.icon}
              label={sidebarOpen ? item.label : ''}
              active={location.pathname === item.path}
            />
          ))}
        </nav>

        <div className="p-4 border-t border-white/5 bg-navy-950">
           <div className={`flex items-center ${!sidebarOpen && 'justify-center'}`}>
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-navy-900 font-bold font-serif shrink-0">
                    {user.name.charAt(0)}
                </div>
                {sidebarOpen && (
                    <div className="ml-3 overflow-hidden">
                        <p className="text-sm font-medium text-white truncate">{user.name}</p>
                        <p className="text-xs text-slate-400 truncate">{user.role}</p>
                    </div>
                )}
           </div>
           {sidebarOpen && (
               <button onClick={onLogout} className="mt-4 w-full flex items-center justify-center text-xs text-red-400 hover:text-red-300 transition-colors py-2 rounded hover:bg-red-900/10">
                   <span className="material-symbols-outlined text-sm mr-2">logout</span>
                   Encerrar Sessão
               </button>
           )}
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col relative overflow-hidden bg-gradient-to-br from-slate-900 to-navy-900">
         {/* Mobile Header (Only visible on small screens - simplified for this implementation) */}
         <div className="h-16 border-b border-white/5 flex items-center px-6 justify-between lg:hidden bg-navy-900/90 backdrop-blur">
            <span className="font-serif text-amber-500">JML ADVOGADOS</span>
            <button className="text-white"><span className="material-symbols-outlined">menu</span></button>
         </div>

         {/* Content Scroll Area */}
         <div className="flex-1 overflow-y-auto p-6 md:p-10 scroll-smooth">
            <div className="max-w-7xl mx-auto">
                {children}
            </div>
         </div>
      </main>
    </div>
  );
};