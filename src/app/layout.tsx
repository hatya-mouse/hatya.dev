import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { ThemeProvider } from "next-themes";
import "katex/dist/katex.min.css";
import "./globals.css";

export const metadata: Metadata = {
    title: "Hatya",
    description: "Official website of Hatya",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className="antialiased">
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                >
                    <Analytics />
                    {children}
                </ThemeProvider>
            </body>
        </html>
    );
}
