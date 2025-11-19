"use client";

import { ThemeProvider } from "@/components/theme-provider/theme-provider";
import SessionWrapper from "@/lib/Provider/SessionProvider/SessionProvider";
import ReactQueryProvider from "@/lib/Provider/QueryClientProvider/QueryClientProvider";
import ToastProvider from "@/lib/Provider/ToastProvider/ToastProvider";

export default function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <SessionWrapper>
        <ReactQueryProvider>{children}</ReactQueryProvider>
        <ToastProvider />
      </SessionWrapper>
    </ThemeProvider>
  );
}
