import clsx from "clsx";

export type CalloutType = "normal" | "warning";

export default function Callout({
    children,
    type = "normal",
    notTranslation = false,
}: Readonly<{
    children: React.ReactNode;
    type?: CalloutType;
    notTranslation?: boolean;
}>) {
    return (
        <div
            className={clsx(
                "flex flex-col px-2 py-1.5 rounded-xl border",
                type == "normal" && "border-(--border) bg-neutral-100 dark:bg-zinc-900",
                type == "warning" && "border-[--alpha(var(--color-amber-500)/75%)] bg-[--alpha(var(--color-amber-500)/10%)]",
            )}
        >
            <p className="text-neutral-500 text-sm select-none">{notTranslation && "これは原文に存在しません"}</p>
            {children}
        </div>
    );
}
