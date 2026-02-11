import WorkCard from "./work_card";
import works from "./works.json";

export default function WorkGrid() {
    works.sort((a, b) => b.year - a.year);

    return (
        <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full place-items-center">
            {works.map((work) => (
                <WorkCard
                    key={work.name}
                    name={work.name}
                    description={work.description}
                    year={work.year}
                    img={work.img}
                />
            ))}
        </div>
    );
}
