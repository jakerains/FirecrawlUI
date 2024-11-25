import { create } from 'zustand';
import { CrawlFormValues } from '@/lib/validations/crawl';

interface CrawlState {
  isLoading: boolean;
  progress: number;
  pagesCrawled: number;
  status: 'idle' | 'crawling' | 'processing' | 'complete' | 'error';
  error: string | null;
  startCrawl: (values: CrawlFormValues) => Promise<void>;
  stopCrawl: () => void;
  reset: () => void;
}

export const useCrawlStore = create<CrawlState>((set) => ({
  isLoading: false,
  progress: 0,
  pagesCrawled: 0,
  status: 'idle',
  error: null,
  startCrawl: async (values) => {
    set({ isLoading: true, status: 'crawling', error: null });
    try {
      // TODO: Implement actual API call
      // For now, just simulate progress
      const interval = setInterval(() => {
        set((state) => {
          if (state.progress >= 100) {
            clearInterval(interval);
            return {
              ...state,
              status: 'complete',
              isLoading: false,
            };
          }
          return {
            ...state,
            progress: state.progress + 1,
            pagesCrawled: Math.floor((state.progress + 1) * 0.5),
          };
        });
      }, 100);
    } catch (error) {
      set({
        isLoading: false,
        status: 'error',
        error: error instanceof Error ? error.message : 'An error occurred',
      });
    }
  },
  stopCrawl: () => {
    set({ isLoading: false, status: 'idle', progress: 0, pagesCrawled: 0 });
  },
  reset: () => {
    set({
      isLoading: false,
      progress: 0,
      pagesCrawled: 0,
      status: 'idle',
      error: null,
    });
  },
}));