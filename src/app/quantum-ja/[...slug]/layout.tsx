import { notFound } from "next/navigation";
import QuantumLinkMenu from "@/components/quantum-ja/QuantumLinkMenu";

interface LayoutProps {
    children: React.ReactNode;
    params: Promise<{ slug?: string[] }>;
}

export default async function QuantumDynamicLayout({
    children,
    params,
}: LayoutProps) {
    const { slug } = await params;

    if (!slug) return <div className="w-full h-full p-8">{children}</div>;

    // The first item of the slug array must be the course ID
    const courseId = slug[0];

    let menuContents = [];

    try {
        const menuModule = await import(
            `@/contents/quantum-ja/${courseId}/index.ts`
        );
        menuContents = menuModule.menuContents;
    } catch (error) {
        console.error(
            `Failed to load menu configuration for course: ${courseId}`,
            error,
        );
        notFound();
    }

    return (
        <div className="flex flex-col md:flex-row w-full h-full overflow-hidden">
            <QuantumLinkMenu menuContents={menuContents} />

            <main className="flex-1 overflow-y-auto pb-12 pt-6 md:pt-12 px-8 md:px-16 text-base leading-relaxed tracking-wide">
                <div className="w-full max-w-4xl mx-auto flex flex-col gap-4">
                    {children}
                </div>
            </main>
        </div>
    );
}
