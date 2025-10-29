import type { Metadata } from "next";

// @ts-ignore: CSS import has no type declarations in this project
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider/theme-provider";

import Navbar from "@/components/Header/Navbar";

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
    <html lang="en">
      <body
        className={`antialiased geist`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >

          <header>
            <Navbar />
          </header>
          <main>
            {children}
          </main>

        </ThemeProvider>
      </body>
    </html>
  );
}
