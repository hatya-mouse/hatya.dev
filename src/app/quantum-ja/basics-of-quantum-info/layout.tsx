import QuantumDocLayout from "@/components/quantum-ja/QuantumDocLayout";
import { MenuItem } from "@/components/quantum-ja/QuantumLinkMenu";

const menuContents: MenuItem[] = [
    {
        type: "page",
        title: "はじめに",
        href: "/quantum-ja/basics-of-quantum-info",
    },
    {
        type: "group",
        categoryTitle: "単一ビットのシステム",
        items: [
            {
                title: "概要",
                href: "/quantum-ja/basics-of-quantum-info/single-systems/intro",
            },
            {
                title: "古典的情報",
                href: "/quantum-ja/basics-of-quantum-info/single-systems/classical-info",
            },
        ],
    },
];

export default function BasicsOfQuantumInformationLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <QuantumDocLayout menuContents={menuContents}>
            {children}
        </QuantumDocLayout>
    );
}
