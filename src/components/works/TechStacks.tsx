export default function TechStacks({
    techs,
    centralize = false,
}: {
    techs: string[];
    centralize?: boolean;
}) {
    return (
        <div
            className="flex flex-wrap flex-row gap-2"
            style={{
                justifyContent: centralize ? "center" : "flex-start",
            }}
        >
            {techs.map((tech) => (
                <span
                    key={tech}
                    className="px-3 py-1 text-sm rounded-full bg-zinc-200 dark:bg-neutral-800 text-zinc-700 dark:text-zinc-300"
                >
                    {tech}
                </span>
            ))}
        </div>
    );
}
