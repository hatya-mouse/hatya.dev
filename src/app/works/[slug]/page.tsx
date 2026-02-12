import { works } from "@/generated/works";
import Image from "next/image";
import { notFound } from "next/navigation";

export default async function WorkPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const work = works.find((work) => work.id === slug);

    if (!work) {
        notFound();
    }

    return (
        <div className="flex flex-col items-center w-full">
            <div className="flex flex-col sm:flex-row gap-4 p-6 max-w-5xl">
                <div className="sm:w-1/2">
                    <Image
                        className="rounded overflow-clip w-full h-auto"
                        src={work.thumbnail}
                        alt={work.name}
                        width={1024}
                        height={1024}
                    />
                </div>
                <div className="flex flex-col gap-2 flex-1">
                    <h3>{work.name}</h3>
                    <p>{work.description}</p>
                </div>
            </div>

            <div className="flex justify-center w-full bg-zinc-100 dark:bg-neutral-900">
                <div className="flex flex-col gap-4 w-full max-w-5xl p-6">
                    {work.links.embed && (
                        <div className="flex flex-col gap-4 w-full">
                            <h3>Play now</h3>
                            <iframe
                                className="w-full aspect-4/3"
                                src={work.links.embed}
                                title={work.name}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
