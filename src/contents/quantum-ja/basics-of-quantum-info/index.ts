import { MenuItem } from "@/components/quantum-ja/QuantumLinkMenu";

export const menuContents: MenuItem[] = [
    {
        type: "page",
        title: "はじめに",
        href: "/quantum-ja/basics-of-quantum-info/intro",
    },
    {
        type: "group",
        categoryTitle: "単一ビットのシステム",
        items: [
            {
                title: "概要",
                href: "/quantum-ja/basics-of-quantum-info/single-systems/overview",
            },
            {
                title: "古典的情報",
                href: "/quantum-ja/basics-of-quantum-info/single-systems/classical-info",
            },
            {
                title: "古典的状態と確率ベクトル",
                href: "/quantum-ja/basics-of-quantum-info/single-systems/classical-states-and-probability-vectors",
            },
        ],
    },
];
