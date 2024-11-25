import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import { 
  Cog6ToothIcon, 
  CommandLineIcon, 
  MapIcon, 
  BugAntIcon,
  BeakerIcon
} from '@heroicons/react/24/outline';

import SettingsPanel from '@/components/panels/SettingsPanel';
import CrawlPanel from '@/components/panels/CrawlPanel';
import ScrapePanel from '@/components/panels/ScrapePanel';
import MapPanel from '@/components/panels/MapPanel';
import ExtractPanel from '@/components/panels/ExtractPanel';
import CrawlProgress from '@/components/CrawlProgress';

const tabConfig = {
  crawl: { 
    color: 'blue',
    icon: BugAntIcon,
    gradient: 'from-blue-500 to-blue-600'
  },
  scrape: { 
    color: 'purple',
    icon: CommandLineIcon,
    gradient: 'from-purple-500 to-purple-600'
  },
  extract: {
    color: 'amber',
    icon: BeakerIcon,
    gradient: 'from-amber-500 to-amber-600'
  },
  map: { 
    color: 'emerald',
    icon: MapIcon,
    gradient: 'from-emerald-500 to-emerald-600'
  },
  settings: { 
    color: 'slate',
    icon: Cog6ToothIcon,
    gradient: 'from-slate-500 to-slate-600'
  },
} as const;

function App() {
  const [activeTab, setActiveTab] = useState('crawl');
  const [showProgress, setShowProgress] = useState(false);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  const handleCrawlStart = () => {
    setShowProgress(true);
  };

  const handleCrawlComplete = () => {
    setShowProgress(false);
  };

  return (
    <ThemeProvider defaultTheme="dark">
      <div className="min-h-screen bg-[#0F172A] text-gray-100 p-8 relative overflow-hidden">
        {/* Background Effects */}
        <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-gray-900 to-gray-900" />
        <div className="fixed inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />
        
        <div className="relative z-10 max-w-6xl mx-auto space-y-8">
          <header className="text-center space-y-2">
            <h1 className="text-4xl font-bold tracking-tight">
              Firecrawl Control Panel
            </h1>
            <p className="text-gray-400">
              Powerful web crawling and data extraction tools
            </p>
          </header>

          <Tabs
            value={activeTab}
            onValueChange={handleTabChange}
            className="space-y-6"
          >
            <div className="relative">
              <TabsList className="w-full h-14 bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-700/50">
                <div className="grid grid-cols-5 w-full h-full gap-1 p-1">
                  {Object.entries(tabConfig).map(([key, { icon: Icon, color, gradient }]) => (
                    <TabsTrigger
                      key={key}
                      value={key}
                      className={`
                        relative group h-full
                        data-[state=active]:bg-gradient-to-b ${gradient}
                        data-[state=active]:shadow-lg
                        data-[state=active]:shadow-${color}-500/20
                        hover:bg-${color}-500/10
                        transition-all duration-300
                      `}
                    >
                      {/* Glow Effect */}
                      <div
                        className={`
                          absolute inset-0 opacity-0 
                          group-hover:opacity-100 
                          group-data-[state=active]:opacity-100
                          transition-opacity duration-300
                          rounded-md
                          bg-${color}-500
                          blur-lg
                          -z-10
                        `}
                      />
                      
                      {/* Content */}
                      <div className="relative flex items-center gap-2">
                        <Icon className={`w-5 h-5 ${activeTab === key ? 'text-white' : `text-${color}-400`}`} />
                        <span className={`text-sm font-medium ${activeTab === key ? 'text-white' : 'text-gray-400'}`}>
                          {key.charAt(0).toUpperCase() + key.slice(1)}
                        </span>
                      </div>
                    </TabsTrigger>
                  ))}
                </div>
              </TabsList>
            </div>

            <AnimatePresence mode="wait">
              {showProgress ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <CrawlProgress onComplete={handleCrawlComplete} />
                </motion.div>
              ) : (
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <TabsContent value="crawl">
                    <CrawlPanel onCrawlStart={handleCrawlStart} />
                  </TabsContent>
                  <TabsContent value="scrape">
                    <ScrapePanel />
                  </TabsContent>
                  <TabsContent value="extract">
                    <ExtractPanel />
                  </TabsContent>
                  <TabsContent value="map">
                    <MapPanel />
                  </TabsContent>
                  <TabsContent value="settings">
                    <SettingsPanel />
                  </TabsContent>
                </motion.div>
              )}
            </AnimatePresence>
          </Tabs>
        </div>
      </div>
      <Toaster />
    </ThemeProvider>
  );
}

export default App;