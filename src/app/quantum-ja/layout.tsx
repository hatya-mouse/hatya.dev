"use client";

import { Inter, Noto_Sans_JP } from "next/font/google";
import QuantumHeader from "@/components/quantum-ja/QuantumHeader";
import "./quantum.css";
import { PythonProvider } from "react-py";

const inter = Inter({
    weight: "400",
    subsets: ["latin"],
    variable: "--font-inter",
});

const notoSansJP = Noto_Sans_JP({
    weight: "400",
    subsets: ["latin"],
    variable: "--font-noto-sans-jp",
});

export default function QuantumPageLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <PythonProvider packages={{ official: ["pyodide-http"] }}>
            <div
                className={`${notoSansJP.variable} ${inter.variable} flex flex-col pt-12 h-screen items-center`}
            >
                <QuantumHeader />
                {children}
            </div>
        </PythonProvider>
    );
}
