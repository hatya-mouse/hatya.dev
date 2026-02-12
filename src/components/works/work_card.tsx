import Image from "next/image";

export default function WorkCard({
    name,
    year,
    description,
    img,
}: {
    name: string;
    year: number;
    description: string;
    img: string;
}) {
    return (
        <div className="flex flex-col max-w-lg gap-2">
            <Image
                className="rounded overflow-clip aspect-video object-cover"
                src={img}
                alt={name}
                width={960}
                height={540}
            />

            <div className="flex flex-col gap-1">
                <div className="flex flex-row gap-2 items-center">
                    <h3>{name}</h3>
                    <p>({year})</p>
                </div>
                <p className="text-wrap">{description}</p>
            </div>
        </div>
    );
}
