import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from '@/components/ui/tooltip';
import { 
  BugAntIcon,
  GlobeAltIcon,
  ArrowPathIcon,
  DocumentTextIcon,
  LinkIcon,
  PhotoIcon
} from '@heroicons/react/24/outline';

interface CrawlPanelProps {
  onCrawlStart: () => void;
}

const OUTPUT_FORMATS = [
  {
    value: 'markdown',
    label: 'Markdown',
    icon: DocumentTextIcon,
    description: 'Clean, readable text content',
  },
  {
    value: 'links',
    label: 'Links Only',
    icon: LinkIcon,
    description: 'Just extract all URLs',
  },
  {
    value: 'html',
    label: 'HTML',
    icon: DocumentTextIcon,
    description: 'Processed HTML content',
  },
  {
    value: 'screenshot',
    label: 'Screenshots',
    icon: PhotoIcon,
    description: 'Page screenshots',
  },
];

export default function CrawlPanel({ onCrawlStart }: CrawlPanelProps) {
  const [url, setUrl] = useState('');
  const [maxDepth, setMaxDepth] = useState(2);
  const [formats, setFormats] = useState<string[]>(['markdown']);
  const [followExternal, setFollowExternal] = useState(false);
  const [respectRobots, setRespectRobots] = useState(true);
  const [mainContentOnly, setMainContentOnly] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleCrawl = async () => {
    setIsLoading(true);
    onCrawlStart();
  };

  return (
    <TooltipProvider>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="p-6 bg-[#1f2937]/50 backdrop-blur-sm border-[#374151]/50 shadow-xl relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:20px_20px]" />
          <div className="relative space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-6 text-gray-100 flex items-center">
                <BugAntIcon className="mr-3 h-6 w-6 text-blue-400" />
                Website Crawler
              </h2>

              <div className="space-y-6">
                {/* Start URL */}
                <div className="space-y-2">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Label htmlFor="url" className="text-sm font-medium text-gray-200">Start URL</Label>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>The starting point for your crawl</p>
                    </TooltipContent>
                  </Tooltip>
                  <div className="relative">
                    <Input
                      id="url"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      className="bg-[#2a3441]/50 border-[#4b5563]/50 focus:border-blue-500/50 focus:ring-blue-500/20 pl-10"
                      placeholder="https://example.com"
                    />
                    <GlobeAltIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                  </div>
                </div>

                {/* Crawl Depth */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Label htmlFor="depth" className="text-sm font-medium text-gray-200">Crawl Depth</Label>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>How many links deep to crawl from the start URL</p>
                      </TooltipContent>
                    </Tooltip>
                    <span className="text-sm text-gray-400">{maxDepth} levels</span>
                  </div>
                  <Slider
                    id="depth"
                    min={1}
                    max={10}
                    step={1}
                    value={[maxDepth]}
                    onValueChange={([value]) => setMaxDepth(value)}
                    className="[&_[role=slider]]:bg-blue-500"
                  />
                </div>

                {/* Output Formats */}
                <div className="space-y-4">
                  <Label className="text-sm font-medium text-gray-200">Output Formats</Label>
                  <div className="grid grid-cols-2 gap-4">
                    {OUTPUT_FORMATS.map(({ value, label, icon: Icon, description }) => (
                      <div
                        key={value}
                        className={`
                          relative p-4 rounded-lg cursor-pointer transition-all duration-200
                          ${formats.includes(value) 
                            ? 'bg-blue-500/20 border-blue-500/30 shadow-[0_0_15px_rgba(59,130,246,0.15)]' 
                            : 'bg-gray-800/20 border-gray-700/30'
                          }
                          border hover:border-blue-500/30 hover:bg-blue-500/10
                        `}
                        onClick={() => {
                          setFormats(prev => 
                            prev.includes(value)
                              ? prev.filter(f => f !== value)
                              : [...prev, value]
                          );
                        }}
                      >
                        <div className="flex items-start space-x-3">
                          <Icon className={`h-5 w-5 ${formats.includes(value) ? 'text-blue-400' : 'text-gray-400'}`} />
                          <div>
                            <h3 className={`text-sm font-medium ${formats.includes(value) ? 'text-blue-300' : 'text-gray-300'}`}>
                              {label}
                            </h3>
                            <p className="text-xs text-gray-500 mt-1">{description}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Advanced Options */}
                <div className="space-y-4">
                  <h3 className="text-sm font-medium text-gray-200">Crawl Options</h3>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 rounded-lg bg-gray-800/20 border border-gray-700/30">
                      <div className="space-y-1">
                        <Label htmlFor="follow-external" className="text-sm">Follow External Links</Label>
                        <p className="text-xs text-gray-500">Crawl links to other domains</p>
                      </div>
                      <Switch
                        id="follow-external"
                        checked={followExternal}
                        onCheckedChange={setFollowExternal}
                        className="data-[state=checked]:bg-blue-600"
                      />
                    </div>

                    <div className="flex items-center justify-between p-3 rounded-lg bg-gray-800/20 border border-gray-700/30">
                      <div className="space-y-1">
                        <Label htmlFor="respect-robots" className="text-sm">Respect robots.txt</Label>
                        <p className="text-xs text-gray-500">Follow website crawling rules</p>
                      </div>
                      <Switch
                        id="respect-robots"
                        checked={respectRobots}
                        onCheckedChange={setRespectRobots}
                        className="data-[state=checked]:bg-blue-600"
                      />
                    </div>

                    <div className="flex items-center justify-between p-3 rounded-lg bg-gray-800/20 border border-gray-700/30">
                      <div className="space-y-1">
                        <Label htmlFor="main-content" className="text-sm">Main Content Only</Label>
                        <p className="text-xs text-gray-500">Skip navigation, ads, and footers</p>
                      </div>
                      <Switch
                        id="main-content"
                        checked={mainContentOnly}
                        onCheckedChange={setMainContentOnly}
                        className="data-[state=checked]:bg-blue-600"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Button 
              onClick={handleCrawl}
              disabled={!url || formats.length === 0 || isLoading}
              className={`
                w-full transition-all duration-300
                ${isLoading 
                  ? 'bg-blue-500/20 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-lg shadow-blue-500/20'
                }
              `}
            >
              {isLoading ? (
                <>
                  <ArrowPathIcon className="w-4 h-4 mr-2 animate-spin" />
                  Starting Crawl...
                </>
              ) : (
                <>
                  <BugAntIcon className="w-4 h-4 mr-2" />
                  Start Crawl
                </>
              )}
            </Button>
          </div>
        </Card>
      </motion.div>
    </TooltipProvider>
  );
}