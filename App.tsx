import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import ModuleView from './components/ModuleView';
import { getAppData, UI_LABELS } from './constants';
import { ModuleType, Language } from './types';
import { Globe } from 'lucide-react';

const App: React.FC = () => {
  const [activeModuleId, setActiveModuleId] = useState<string>(ModuleType.OVERVIEW);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [language, setLanguage] = useState<Language>('en');

  const appData = getAppData(language);
  const activeModuleData = appData.find(m => m.id === activeModuleId) || appData[0];
  const labels = UI_LABELS[language];

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'zh' : 'en');
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      <Sidebar 
        modules={appData} 
        activeModuleId={activeModuleId} 
        onSelectModule={setActiveModuleId}
        isOpen={isSidebarOpen}
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        language={language}
      />

      <main className="flex-1 overflow-y-auto h-full w-full relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10 lg:py-12">
          
          {/* Top Info Bar */}
          <div className="hidden lg:flex justify-between items-center mb-8 border-b border-slate-200 pb-4">
            <div>
              <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">{labels.currentContext}</h2>
              <p className="text-slate-900 font-medium">{labels.contextDesc}</p>
            </div>
            <div className="flex gap-6 items-center">
               <div className="text-right">
                  <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">{labels.status}</h2>
                  <p className="text-emerald-600 font-medium flex items-center justify-end gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    {labels.ready}
                  </p>
               </div>
               
               <button 
                 onClick={toggleLanguage}
                 className="flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-600 hover:text-indigo-600 hover:border-indigo-600 transition-colors shadow-sm"
               >
                 <Globe size={16} />
                 <span className="font-medium">{language === 'en' ? '中文' : 'English'}</span>
               </button>
            </div>
          </div>
          
          {/* Mobile Language Toggle */}
          <div className="lg:hidden absolute top-4 right-4 z-50">
             <button 
                 onClick={toggleLanguage}
                 className="p-2 bg-white rounded-md shadow-md border border-slate-200 text-slate-600"
               >
                 <Globe size={20} />
               </button>
          </div>

          <ModuleView data={activeModuleData} language={language} />
          
        </div>
      </main>
    </div>
  );
};

export default App;