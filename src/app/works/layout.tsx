import { JetBrains_Mono } from "next/font/google";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

const jetBrains = JetBrains_Mono({
    weight: "500",
    subsets: ["latin"],
});

export default function WorksLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div
            className={`${jetBrains.className} flex flex-col min-h-screen pt-12`}
        >
            <Header />
            {children}
            <Footer />
        </div>
    );
}
