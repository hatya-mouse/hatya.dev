import { cva, type VariantProps } from "class-variance-authority";

export const textButtonVariants = cva(
    [
        "px-1.5 py-0.5",
        "flex flex-row items-center justify-center gap-2",
        "rounded-[7px]",
        "border border-(--border)",
        "cursor-pointer",
        "transition-all duration-50 ease-in-out",
        "hover:brightness-90",
        "active:brightness-70",
        "disabled:cursor-default disabled:opacity-50",
    ],
    {
        variants: {
            intent: {
                normal: "bg-[rgba(150,150,150,0.2)]",
                highlighted: "bg-[rgba(0,130,220,0.7)] text-white",
            },
        },
        defaultVariants: {
            intent: "normal",
        },
    },
);

export interface TextButtonProps
    extends
        React.ButtonHTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof textButtonVariants> {}

export default function TextButton({
    className,
    intent,
    ...props
}: TextButtonProps) {
    return (
        <button
            className={textButtonVariants({ intent, className })}
            {...props}
        />
    );
}
