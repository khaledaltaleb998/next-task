'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState, ReactNode, useEffect } from 'react';
import { initCart } from '@/store/cartStore';

export default function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  useEffect(() => {
    initCart();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}
