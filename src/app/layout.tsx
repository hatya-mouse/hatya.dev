import type { Metadata } from "next";
import { M_PLUS_1p, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

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
                {children}
            </body>
        </html>
    );
}
