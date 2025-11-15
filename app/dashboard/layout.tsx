
import "../(main)/globals.css"

import ToastProvider from "@/lib/Provider/ToastProvider/ToastProvider";

import { ThemeProvider } from "@/components/theme-provider/theme-provider";
import SideBar from "./components/sidebar/page";
export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className="hero-gradient  min-h-screen relative" >
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                />
                {/* <div className="container-custom">
                    <BackButton />
                </div> */}
                <div className=" w-full">
                    <aside className="lg:block hidden fixed inset-0 w-[228px] h-full shadow-lg ">
                        <SideBar />
                    </aside>
                    <main className="lg:ml-64">{children}</main>
                </div>
                <ToastProvider />
            </body>
        </html>
    );
}