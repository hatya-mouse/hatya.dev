import type { Metadata } from "next";
import { M_PLUS_1p, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";

const jetBrains = JetBrains_Mono({
    weight: "500",
    subsets: ["latin"],
    variable: "--font-jetbrains",
});

const mPlus1P = M_PLUS_1p({
    weight: "400",
    subsets: ["latin"],
    display: "swap",
    variable: "--font-m-plus",
});

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
        <html lang="en">
            <body
                className={`${jetBrains.variable} ${mPlus1P.variable} antialiased`}
            >
                <Analytics />
                <div className="flex flex-col min-h-screen pt-12">
                    <Header />
                    {children}
                    <Footer />
                </div>
            </body>
        </html>
    );
}
