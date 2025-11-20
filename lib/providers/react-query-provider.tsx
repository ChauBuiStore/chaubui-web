'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClientConfig = {
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    },
  },
}

let browserQueryClient: QueryClient | undefined = undefined

function getQueryClient() {
  if (typeof window === 'undefined') {
    return new QueryClient(queryClientConfig)
  }

  if (!browserQueryClient) {
    browserQueryClient = new QueryClient(queryClientConfig)
  }

  return browserQueryClient
}

export function ReactQueryProvider({ children }: { children: React.ReactNode }) {
  const queryClient = getQueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}
