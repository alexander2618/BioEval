import React from 'react';
import { ModuleData, Language } from '../types';
import { Activity, Menu } from 'lucide-react';
import { UI_LABELS } from '../constants';

interface SidebarProps {
  modules: ModuleData[];
  activeModuleId: string;
  onSelectModule: (id: string) => void;
  isOpen: boolean;
  toggleSidebar: () => void;
  language: Language;
}

const Sidebar: React.FC<SidebarProps> = ({ modules, activeModuleId, onSelectModule, isOpen, toggleSidebar, language }) => {
  const labels = UI_LABELS[language];

  return (
    <>
      {/* Mobile Toggle */}
      <button 
        onClick={toggleSidebar}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-md shadow-md border border-slate-200 text-slate-600"
      >
        <Menu size={24} />
      </button>

      {/* Sidebar Container */}
      <div className={`
        fixed inset-y-0 left-0 z-40 w-72 bg-slate-900 text-slate-300 transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:static flex flex-col h-full
      `}>
        {/* Logo Area */}
        <div className="p-8 border-b border-slate-800">
          <div className="flex items-center gap-3 text-white">
            <div className="bg-indigo-600 p-2 rounded-lg">
              <Activity size={24} />
            </div>
            <div>
              <h1 className="font-bold text-lg leading-tight">BioEval AI</h1>
              <p className="text-xs text-indigo-400 font-medium">Framework v1.0</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4 px-4">
            {labels.modules}
          </div>
          {modules.map((module) => (
            <button
              key={module.id}
              onClick={() => {
                onSelectModule(module.id);
                // Close on mobile when clicked
                if (window.innerWidth < 1024) toggleSidebar();
              }}
              className={`
                w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200
                ${activeModuleId === module.id 
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-900/50' 
                  : 'hover:bg-slate-800 text-slate-400 hover:text-white'}
              `}
            >
              {module.icon}
              {module.title}
            </button>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 text-xs text-slate-500 text-center">
          <p>{labels.designedFor}</p>
          <p className="mt-1 opacity-50">&copy; 2024 Evaluation Team</p>
        </div>
      </div>
      
      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 lg:hidden backdrop-blur-sm"
          onClick={toggleSidebar}
        />
      )}
    </>
  );
};

export default Sidebar;