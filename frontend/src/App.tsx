import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, BrainCircuit, Upload, BarChart3, Info } from 'lucide-react';
import Background3D from './components/Background3D';
import UploadView from './components/UploadView';
import AnalyticsView from './components/AnalyticsView';
import ExplanationView from './components/ExplanationView';

type Tab = 'upload' | 'analytics' | 'explanation';

function App() {
  const [isDark, setIsDark] = useState(true);
  const [activeTab, setActiveTab] = useState<Tab>('upload');

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const tabs = [
    { id: 'upload', label: 'Upload & Predict', icon: Upload },
    { id: 'analytics', label: 'Dashboard', icon: BarChart3 },
    { id: 'explanation', label: 'Model Info', icon: Info },
  ];

  return (
    <div className="min-h-screen relative overflow-x-hidden">
      <Background3D isDark={isDark} activeTab={activeTab} />

      {/* Navbar */}
      <nav className="sticky top-0 z-50 glass-panel border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <BrainCircuit className="w-8 h-8 text-neon-purple" />
              <span className="font-heading font-bold text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-neon-purple to-neon-cyan">
                VisionAI
              </span>
            </div>

            <div className="hidden md:flex space-x-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as Tab)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center space-x-2
                    ${activeTab === tab.id 
                      ? 'bg-white/20 dark:bg-white/10 shadow-sm' 
                      : 'hover:bg-white/10 dark:hover:bg-white/5 text-slate-600 dark:text-slate-300'}`}
                >
                  <tab.icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>

            <button
              onClick={() => setIsDark(!isDark)}
              className="p-2 rounded-full hover:bg-white/20 dark:hover:bg-white/10 transition-colors"
            >
              {isDark ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-slate-600" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Nav */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 glass-panel border-t border-white/20 pb-safe">
        <div className="flex justify-around p-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as Tab)}
              className={`p-3 rounded-xl flex flex-col items-center space-y-1
                ${activeTab === tab.id ? 'text-neon-cyan' : 'text-slate-500'}`}
            >
              <tab.icon className="w-5 h-5" />
              <span className="text-[10px] font-medium">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-24 md:pb-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 'upload' && <UploadView />}
            {activeTab === 'analytics' && <AnalyticsView isDark={isDark} />}
            {activeTab === 'explanation' && <ExplanationView />}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}

export default App;
