import WorkCard from "./WorkCard";
import { works } from "@/generated/works";

export default async function WorkGrid() {
    const sortedWorks = works.toSorted((a, b) => b.year - a.year);

    return (
        <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full justify-items-center align-top">
            {sortedWorks.map((work) => (
                <WorkCard work={work} key={work.id} />
            ))}
        </div>
    );
}
