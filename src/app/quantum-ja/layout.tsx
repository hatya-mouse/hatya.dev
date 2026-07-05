import QuantumHeader from "@/components/QuantumHeader";
import { Inter, Noto_Sans_JP } from "next/font/google";

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
            className={`${notoSansJP.variable} ${inter.variable} flex flex-col pt-12`}
        >
            <QuantumHeader />
            {children}
        </div>
    );
}
