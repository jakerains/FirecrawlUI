import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from '@/components/ui/tooltip';
import { Cog6ToothIcon } from '@heroicons/react/24/outline';

export default function SettingsPanel() {
  const [apiKey, setApiKey] = useState('');
  const { toast } = useToast();

  const handleSave = () => {
    localStorage.setItem('firecrawl-api-key', apiKey);
    toast({
      title: 'Settings saved',
      description: 'Your API key has been saved successfully.',
    });
  };

  return (
    <TooltipProvider>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="p-6 bg-[#111827]/50 backdrop-blur-sm border-[#1E293B]/50 shadow-xl relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:20px_20px]" />
          <div className="space-y-6 relative z-10">
            <div>
              <h2 className="text-2xl font-bold mb-4">API Configuration</h2>
              <div className="space-y-2">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Label htmlFor="api-key" className="cursor-help">API Key</Label>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Your Firecrawl API key from the dashboard</p>
                  </TooltipContent>
                </Tooltip>
                <Input
                  id="api-key"
                  type="password"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  className="bg-[#1E293B]/50 border-[#374151]"
                  placeholder="Enter your Firecrawl API key"
                />
              </div>
            </div>
            
            <Button onClick={handleSave} className="w-full bg-gradient-to-r from-gray-500/20 to-gray-600/20 hover:from-gray-500/30 hover:to-gray-600/30 border border-gray-500/20 transition-all duration-300">
              <Cog6ToothIcon className="w-4 h-4 mr-2" />
              Save Settings
            </Button>
          </div>
        </Card>
      </motion.div>
    </TooltipProvider>
  );
}