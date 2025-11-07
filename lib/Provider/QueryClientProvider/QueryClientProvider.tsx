'use client'

import { ReactNode } from "react"
import { QueryClient, QueryClientProvider as Provider } from '@tanstack/react-query'

const queryClient = new QueryClient()

export default function ReactQueryProvider({ children }: { children: ReactNode }) {
  return <Provider client={queryClient}>{children}</Provider>
}
