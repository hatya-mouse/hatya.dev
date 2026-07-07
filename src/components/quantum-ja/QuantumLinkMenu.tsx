"use client";

import clsx from "clsx";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export type MenuLinkItem = {
    title: string;
    href: string;
};

export type MenuCategory = {
    categoryTitle: string;
    href: string;
    items: MenuLinkItem[];
};

export default function QuantumLinkMenu({
    menuContents,
}: {
    menuContents: MenuCategory[];
}) {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState<boolean[]>(
        menuContents.map(() => false),
    );

    return (
        <aside className="w-full md:w-64 flex flex-col gap-2 p-3 border-r border-(--border) shrink-0">
            {menuContents.map((category, categoryIndex) => {
                const isCategoryActive = pathname === category.href;

                return (
                    <div key={categoryIndex} className="flex flex-col gap-1">
                        <Link
                            className={clsx(
                                "flex flex-row gap-1 items-center justify-between font-bold px-2 py-1 cursor-pointer rounded-lg transition-all duration-150 ease-in-out hover:bg-neutral-100 dark:hover:bg-zinc-900",
                                isCategoryActive
                                    ? "bg-neutral-200 dark:bg-zinc-900"
                                    : "text-neutral-600 dark:text-neutral-400",
                            )}
                            href={category.href}
                            onClick={() => {
                                setIsOpen((prev) => {
                                    const newState = { ...prev };
                                    newState[categoryIndex] =
                                        !newState[categoryIndex];
                                    return newState;
                                });
                            }}
                        >
                            <p>
                                {categoryIndex + 1}. {category.categoryTitle}
                            </p>
                            {category.items.length > 0 && (
                                <ChevronRight
                                    className={clsx(
                                        "transition-transform duration-200 ease-in-out",
                                        isOpen[categoryIndex] && "rotate-90",
                                    )}
                                />
                            )}
                        </Link>
                        <div
                            className={clsx(
                                "grid transition-all duration-200 ease-in-out",
                                isOpen[categoryIndex]
                                    ? "grid-rows-[1fr] opacity-100"
                                    : "grid-rows-[0fr] opacity-0",
                            )}
                        >
                            <div className="flex flex-col gap-1 pl-2 overflow-hidden">
                                {category.items.map((item, itemIndex) => {
                                    const isActive = pathname === item.href;

                                    return (
                                        <Link
                                            key={itemIndex}
                                            href={item.href}
                                            className={clsx(
                                                "w-full px-2 py-1 rounded-lg transition-all duration-150 ease-in-out",
                                                !isActive
                                                    ? "font-bold bg-neutral-200 dark:bg-zinc-900"
                                                    : "text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-zinc-900",
                                            )}
                                        >
                                            {item.title}
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                );
            })}
        </aside>
    );
}
