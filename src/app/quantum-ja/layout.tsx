import QuantumHeader from "@/components/quantum-ja/QuantumHeader";
import { Inter, Noto_Sans_JP } from "next/font/google";
import "./quantum.css";
import QuantumLinkMenu from "@/components/quantum-ja/QuantumLinkMenu";

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

export default function QuantumLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <div
            className={`${notoSansJP.variable} ${inter.variable} flex flex-col pt-12 h-screen items-center`}
        >
            <QuantumHeader />

            <div className="flex flex-col md:flex-row gap-8 w-full min-h-full">
                <QuantumLinkMenu
                    menuContents={[
                        {
                            categoryTitle: "はじめに",
                            href: "/quantum-ja",
                            items: [],
                        },
                    ]}
                />
                <div className="flex flex-col gap-4 py-6 md:py-12 px-8 md:px-16 w-full max-w-6xl text-base leading-relaxed tracking-wide">
                    {children}
                </div>
            </div>
        </div>
    );
}
