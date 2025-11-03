
import "../(main)/globals.css"
import BackButton from "@/components/BackButton/BackButton";
import ToastProvider from "@/lib/Provider/ToastProvider/ToastProvider";

import { ThemeProvider } from "@/components/theme-provider/theme-provider";
export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className="hero-gradient custom-container min-h-screen" >
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                />
                <div className="mt-10 container-custom">
                    <BackButton />
                </div>
                <main>{children}</main>
                <ToastProvider />
            </body>
        </html>
    );
}