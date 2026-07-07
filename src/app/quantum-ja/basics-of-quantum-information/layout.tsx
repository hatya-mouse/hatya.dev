import QuantumDocLayout from "@/components/quantum-ja/QuantumDocLayout";
import { MenuItem } from "@/components/quantum-ja/QuantumLinkMenu";

const menuContents: MenuItem[] = [
    {
        type: "page",
        title: "はじめに",
        href: "/quantum-ja/basics-of-quantum-information",
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
