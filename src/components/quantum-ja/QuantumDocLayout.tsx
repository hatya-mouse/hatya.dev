import QuantumLinkMenu, { MenuItem } from "./QuantumLinkMenu";

export default function QuantumDocLayout({
    menuContents,
    children,
}: Readonly<{ menuContents: MenuItem[]; children: React.ReactNode }>) {
    return (
        <div className="flex flex-col md:flex-row gap-8 w-full min-h-full">
            <QuantumLinkMenu menuContents={menuContents} />

            <div className="flex flex-col gap-4 md:py-12 px-8 md:px-16 w-full max-w-6xl text-base leading-relaxed tracking-wide">
                {children}
            </div>
        </div>
    );
}
