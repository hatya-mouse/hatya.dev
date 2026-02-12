import { getWork } from "@/components/works/work_utility";
import { notFound } from "next/navigation";

export default async function WorkPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const work = getWork(slug);

    if (!work) {
        notFound();
    }

    return (
        <div className="flex flex-col items-center py-8 px-8 md:px-16 w-full bg-zinc-100 dark:bg-neutral-900">
            {slug}
        </div>
    );
}
