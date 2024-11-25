import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { 
  StopIcon, 
  DocumentTextIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline';

interface CrawlProgressProps {
  onComplete: () => void;
}

export default function CrawlProgress({ onComplete }: CrawlProgressProps) {
  const [progress, setProgress] = useState(0);
  const [pagesCrawled, setPagesCrawled] = useState(0);
  const [status, setStatus] = useState<'crawling' | 'processing' | 'complete'>('crawling');

  useEffect(() => {
    // Simulate crawl progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setStatus('complete');
          return 100;
        }
        setPagesCrawled(Math.floor((prev + 1) * 0.5));
        return prev + 1;
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="p-6 bg-[#1f2937]/50 backdrop-blur-sm border-[#374151]/50 shadow-xl relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:20px_20px]" />
      <div className="relative space-y-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-semibold text-gray-100">
              {status === 'complete' ? 'Crawl Complete' : 'Crawling in Progress'}
            </h3>
            <p className="text-sm text-gray-400 mt-1">
              {pagesCrawled} pages processed
            </p>
          </div>
          
          {status !== 'complete' && (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <ArrowPathIcon className="w-5 h-5 text-blue-400" />
            </motion.div>
          )}
        </div>

        <div className="space-y-2">
          <Progress value={progress} className="h-2" />
          <div className="flex justify-between text-sm text-gray-400">
            <span>{progress}% complete</span>
            <span>{status}</span>
          </div>
        </div>

        <div className="flex gap-4">
          {status === 'complete' ? (
            <Button 
              onClick={onComplete}
              className="flex-1 bg-green-500 hover:bg-green-600 text-white"
            >
              <DocumentTextIcon className="w-4 h-4 mr-2" />
              View Results
            </Button>
          ) : (
            <Button 
              variant="destructive"
              className="flex-1"
            >
              <StopIcon className="w-4 h-4 mr-2" />
              Stop Crawl
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}