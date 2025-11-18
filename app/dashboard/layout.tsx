
import "../(main)/globals.css"

import ToastProvider from "@/lib/Provider/ToastProvider/ToastProvider";


import SideBar from "./components/sidebar/page";
import Navbar from "./components/navbar/page";
import { ThemeProvider } from "@/components/theme-provider/theme-provider";
import SessionWrapper from "@/lib/Provider/SessionProvider/SessionProvider";
import ReactQueryProvider from "@/lib/Provider/QueryClientProvider/QueryClientProvider";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" suppressHydrationWarning>

            <body className=" hero-gradient  min-h-screen relative" >
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    
                />
                <SessionWrapper>

                    <ReactQueryProvider>


                        <aside className="lg:block hidden fixed inset-0 w-[238px] h-full shadow-lg dark:border-r border-gray-600 ">
                            <SideBar />
                        </aside>


                        <main className="lg:ml-60 ">
                            <Navbar />
                            {children}
                        </main>

                        <ToastProvider />
                    </ReactQueryProvider>
                </SessionWrapper>
            </body>
        </html>
    );
}