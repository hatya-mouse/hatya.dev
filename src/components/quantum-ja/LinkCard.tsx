import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

export type CardType = "link" | "previous" | "next";

export default function LinkCard({
    type = "link",
    href,
    subtitle,
    title,
    description,
}: {
    type?: CardType;
    href: string;
    subtitle?: string;
    title?: string;
    description?: string;
}) {
    return (
        <Link
            href={href}
            className="flex flex-col px-2 py-2 rounded-xl bg-neutral-100 dark:bg-zinc-900 border border-(--border) hover:border-[--alpha(var(--color-indigo-500)/75%)] hover:bg-[--alpha(var(--color-indigo-500)/10%)] hover:shadow-[0px_0px_32px_--alpha(var(--color-indigo-500)/50%)] transition-all duration-200 ease-in-out"
        >
            {type === "link" && (
                <p className="mx-1 text-neutral-500 dark:text-neutral-400 uppercase">
                    {subtitle}
                </p>
            )}
            {type === "previous" && (
                <div className="mr-1 font-mono text-sm flex flex-row items-center text-neutral-500 dark:text-neutral-400">
                    <ChevronLeft size={20} />
                    PREVIOUS
                </div>
            )}
            {type === "next" && (
                <div className="mx-1 font-mono text-sm flex flex-row items-center text-neutral-500 dark:text-neutral-400">
                    NEXT
                    <ChevronRight size={20} />
                </div>
            )}

            {title && <h2 className="mx-1">{title}</h2>}
            {description && <p className="mx-1">{description}</p>}
        </Link>
    );
}
