import type { Metadata } from "next";

export const metadata: Metadata = { title: "DEEPER", description: "" };

export default async function Hatya({
    params,
}: {
    params: Promise<{ slug: [string] }>;
}) {
    const { slug } = await params;
    const isValid = slug?.every((s) => s == "hatya") ?? true;

    if (!isValid) {
        return <div className="w-screen h-screen bg-red-500"></div>;
    }

    const brightness = (100 - (slug?.length % 100)) * 2.55;

    return (
        <div
            className={`w-screen h-screen`}
            style={{
                backgroundColor: `rgb(${brightness}, ${brightness}, ${brightness})`,
            }}
        >
            <a href={`/hatya/hatya/${slug?.join("/") ?? ""}`}>GO DEEPER</a>
        </div>
    );
}
