import TechStacks from "@/components/works/TechStacks";
import { works } from "@/generated/works";
import Image from "next/image";
import Link from "next/link";
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
        <div className="grow flex flex-col items-center w-full">
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
                    <div className="flex flex-row gap-2 items-center">
                        <h2>{work.name}</h2>
                        <p>({work.year})</p>
                    </div>
                    <TechStacks techs={work.tech} />
                    <p>{work.description}</p>

                    {work.links.repository && (
                        <Link
                            href={work.links.repository}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            View on GitHub
                        </Link>
                    )}
                    {work.links.demo && (
                        <Link
                            href={work.links.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Play Now
                        </Link>
                    )}
                </div>
            </div>

            {work.links.embed && (
                <div className="grow flex justify-center w-full bg-zinc-100 dark:bg-neutral-900">
                    <div className="flex flex-col gap-2 w-full max-w-5xl p-6">
                        {work.links.embed.header && (
                            <h2>{work.links.embed.header}</h2>
                        )}
                        <iframe
                            className={`w-full max-w-2xl ${work.links.embed.className}`}
                            src={work.links.embed.url}
                            title={work.name}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
