import clsx from "clsx";

export type CalloutType = "normal" | "warning";

export default function Callout({
    type = "normal",
    children,
}: Readonly<{
    type?: CalloutType;
    children: React.ReactNode;
}>) {
    return (
        <div
            className={clsx(
                "flex flex-col px-2 py-1.5 rounded-xl border",
                type == "normal" && "border-(--border) bg-neutral-100 dark:bg-zinc-900",
                type == "warning" && "border-[--alpha(var(--color-amber-500)/75%)] bg-[--alpha(var(--color-amber-500)/10%)]",
            )}
        >
            {children}
        </div>
    );
}
