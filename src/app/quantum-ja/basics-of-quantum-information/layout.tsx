import QuantumDocLayout from "@/components/quantum-ja/QuantumDocLayout";
import { MenuItem } from "@/components/quantum-ja/QuantumLinkMenu";

const menuContents: MenuItem[] = [
    {
        type: "page",
        title: "はじめに",
        href: "/quantum-ja/basics-of-quantum-information",
    },
    {
        type: "group",
        categoryTitle: "単一ビットのシステム",
        items: [
            {
                title: "概要",
                href: "/quantum-ja/basics-of-quantum-information/single-system",
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
