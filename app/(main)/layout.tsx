import type { Metadata } from "next";
import SessionProvider from "@/lib/Provider/SessionProvider/SessionProvider";
// @ts-ignore: CSS import has no type declarations in this project
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider/theme-provider";

import Navbar from "@/components/Header/Navbar";
import ToastProvider from "@/lib/Provider/ToastProvider/ToastProvider";


export const metadata: Metadata = {
  title: "NextHire",
  description: "A modern job portal built with Next.js",


};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`antialiased geist`}
      >
        <SessionProvider>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
        
        >

          <header>
            <Navbar />
          </header>
          <main>
            {children}
          </main>
        <ToastProvider/>
        </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
