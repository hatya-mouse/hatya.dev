import QuantumHeader from "@/components/quantum-ja/QuantumHeader";
import { Inter, Noto_Sans_JP } from "next/font/google";
import "./quantum.css";

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
            className={`${notoSansJP.variable} ${inter.variable} flex flex-col pt-12 items-center`}
        >
            <QuantumHeader />

            <div className="flex flex-col gap-2 py-6 md:py-12 px-8 md:px-16 w-full max-w-6xl text-base">
                {children}
            </div>
        </div>
    );
}
