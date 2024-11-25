import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from '@/components/ui/tooltip';
import { MapIcon, GlobeAltIcon, MagnifyingGlassIcon, ListBulletIcon } from '@heroicons/react/24/outline';

interface OutputFormat {
  value: string;
  label: string;
  icon: typeof MapIcon;
  description: string;
}

const OUTPUT_FORMATS: OutputFormat[] = [
  {
    value: 'json',
    label: 'JSON',
    icon: ListBulletIcon,
    description: 'Structured data format',
  },
  {
    value: 'csv',
    label: 'CSV',
    icon: ListBulletIcon,
    description: 'Spreadsheet compatible',
  },
  {
    value: 'sitemap',
    label: 'Sitemap XML',
    icon: GlobeAltIcon,
    description: 'Standard sitemap format',
  },
  {
    value: 'text',
    label: 'Plain Text',
    icon: ListBulletIcon,
    description: 'Simple URL list',
  },
];

export default function MapPanel() {
  const [url, setUrl] = useState('');
  const [format, setFormat] = useState<string>('json');
  const [includeSubdomains, setIncludeSubdomains] = useState(false);
  const [searchPattern, setSearchPattern] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleMap = async () => {
    setIsLoading(true);
    // TODO: Implement mapping logic
    setTimeout(() => setIsLoading(false), 2000);
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
                <MapIcon className="mr-3 h-6 w-6 text-emerald-400" />
                Site Mapping
              </h2>

              <div className="space-y-6">
                {/* URL Input */}
                <div className="space-y-2">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Label htmlFor="url" className="text-sm font-medium text-gray-200">Website URL</Label>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Enter the root URL of the website to map</p>
                    </TooltipContent>
                  </Tooltip>
                  <div className="relative">
                    <Input
                      id="url"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      className="bg-[#2a3441]/50 border-[#4b5563]/50 focus:border-emerald-500/50 focus:ring-emerald-500/20 pl-10"
                      placeholder="https://example.com"
                    />
                    <GlobeAltIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                  </div>
                </div>

                {/* Search Pattern */}
                <div className="space-y-2">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Label htmlFor="search" className="text-sm font-medium text-gray-200">Search Pattern (Optional)</Label>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Filter URLs containing specific text or matching a pattern</p>
                    </TooltipContent>
                  </Tooltip>
                  <div className="relative">
                    <Input
                      id="search"
                      value={searchPattern}
                      onChange={(e) => setSearchPattern(e.target.value)}
                      className="bg-[#2a3441]/50 border-[#4b5563]/50 focus:border-emerald-500/50 focus:ring-emerald-500/20 pl-10"
                      placeholder="/blog/* or specific-text"
                    />
                    <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                  </div>
                </div>

                {/* Output Format Selection */}
                <div className="space-y-4">
                  <Label className="text-sm font-medium text-gray-200">Output Format</Label>
                  <div className="grid grid-cols-2 gap-4">
                    {OUTPUT_FORMATS.map(({ value, label, icon: Icon, description }) => (
                      <div
                        key={value}
                        className={`
                          relative p-4 rounded-lg cursor-pointer transition-all duration-200
                          ${format === value 
                            ? 'bg-emerald-500/20 border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.15)]' 
                            : 'bg-gray-800/20 border-gray-700/30'
                          }
                          border hover:border-emerald-500/30 hover:bg-emerald-500/10
                        `}
                        onClick={() => setFormat(value)}
                      >
                        <div className="flex items-start space-x-3">
                          <Icon className={`h-5 w-5 ${format === value ? 'text-emerald-400' : 'text-gray-400'}`} />
                          <div>
                            <h3 className={`text-sm font-medium ${format === value ? 'text-emerald-300' : 'text-gray-300'}`}>
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
                  <h3 className="text-sm font-medium text-gray-200">Advanced Options</h3>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-gray-800/20 border border-gray-700/30">
                    <div className="space-y-1">
                      <Label htmlFor="include-subdomains" className="text-sm">Include Subdomains</Label>
                      <p className="text-xs text-gray-500">Map URLs from all subdomains</p>
                    </div>
                    <Switch
                      id="include-subdomains"
                      checked={includeSubdomains}
                      onCheckedChange={setIncludeSubdomains}
                      className="data-[state=checked]:bg-emerald-600"
                    />
                  </div>
                </div>
              </div>
            </div>

            <Button 
              onClick={handleMap}
              disabled={!url || isLoading}
              className={`
                w-full transition-all duration-300
                ${isLoading 
                  ? 'bg-emerald-500/20 cursor-not-allowed' 
                  : 'bg-emerald-500 hover:bg-emerald-600 shadow-lg shadow-emerald-500/20'
                }
              `}
            >
              <MapIcon className="w-4 h-4 mr-2" />
              {isLoading ? 'Mapping...' : 'Generate Map'}
            </Button>
          </div>
        </Card>
      </motion.div>
    </TooltipProvider>
  );
}