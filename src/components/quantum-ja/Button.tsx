import { cva, type VariantProps } from "class-variance-authority";

export const textButtonVariants = cva(
    [
        "px-1.5 py-0.5",
        "flex flex-row items-center justify-center gap-2",
        "rounded-lg",
        "cursor-pointer",
        "transition-all duration-100 ease-in-out",
        "hover:brightness-90",
        "active:brightness-70",
        "disabled:cursor-default disabled:opacity-50",
    ],
    {
        variants: {
            variant: {
                normal: "bg-neutral-50 dark:bg-zinc-800 border border-(--border)",
                noOutline: "hover:bg-[rgba(255,255,255,0.1)]",
                green: "bg-lime-600 text-white border border-(--border)",
            },
        },
        defaultVariants: {
            variant: "normal",
        },
    },
);

export interface TextButtonProps
    extends
        React.ButtonHTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof textButtonVariants> {}

export default function TextButton({
    className,
    variant,
    ...props
}: TextButtonProps) {
    return (
        <button
            className={textButtonVariants({ variant, className })}
            {...props}
        />
    );
}
