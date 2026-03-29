import { Work } from "@/schema/work";
import Image from "next/image";
import Link from "next/link";

export default function WorkCard({ work }: { work: Work }) {
    return (
        <Link
            href={`/works/${work.id}`}
            className="flex flex-col max-w-lg gap-2"
        >
            <Image
                className="rounded overflow-clip aspect-video object-cover"
                src={work.thumbnail}
                alt={work.name}
                width={960}
                height={540}
            />

            <div className="flex flex-col gap-1">
                <div className="flex flex-row gap-2 items-center">
                    <h3>{work.name}</h3>
                    <p>({work.year})</p>
                </div>
                <p className="text-wrap">{work.description}</p>
            </div>
        </Link>
    );
}
