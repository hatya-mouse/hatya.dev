import QuantumLinkMenu, { MenuItem } from "./QuantumLinkMenu";

export default function QuantumDocLayout({
    menuContents,
    children,
}: Readonly<{ menuContents: MenuItem[]; children: React.ReactNode }>) {
    return (
        <div className="flex flex-col md:flex-row gap-8 w-full h-full overflow-hidden">
            <QuantumLinkMenu menuContents={menuContents} />

            <main className="flex-1 overflow-y-auto md:py-12 px-8 md:px-16 text-base leading-relaxed tracking-wide">
                <div className="flex flex-col gap-4 w-full max-w-4xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
}
