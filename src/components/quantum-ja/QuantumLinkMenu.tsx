"use client";

import clsx from "clsx";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export type SinglePageItem = {
    type: "page";
    title: string;
    href: string;
};

export type GroupItem = {
    type: "group";
    categoryTitle: string;
    items: { title: string; href: string }[];
};

export type MenuItem = SinglePageItem | GroupItem;

export default function QuantumLinkMenu({
    menuContents,
}: {
    menuContents: MenuItem[];
}) {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState<Record<number, boolean>>(
        Object.fromEntries(menuContents.map((_, index) => [index, true])),
    );

    const toggleGroup = (index: number) => {
        setIsOpen((prev) => ({ ...prev, [index]: !prev[index] }));
    };

    return (
        <aside className="w-full md:w-64 flex flex-col gap-1 p-3 border-b border-(--border) md:border-b-0 md:border-r shrink-0">
            {menuContents.map((item, index) => {
                if (item.type === "page") {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={index}
                            href={item.href}
                            className={clsx(
                                "flex flex-row gap-1 items-center justify-between font-bold px-2 py-1 cursor-pointer rounded-lg transition-all duration-150 ease-in-out hover:bg-neutral-100 dark:hover:bg-zinc-900",
                                isActive
                                    ? "bg-neutral-200 dark:bg-zinc-900"
                                    : "text-neutral-600 dark:text-neutral-400",
                            )}
                        >
                            {index + 1}. {item.title}
                        </Link>
                    );
                }

                const isCategoryOpen = isOpen[index];

                return (
                    <div key={index} className="flex flex-col gap-1 mt-1">
                        <button
                            className="flex flex-row gap-1 items-center justify-between font-bold px-2 py-1 cursor-pointer rounded-lg transition-all duration-150 ease-in-out hover:bg-neutral-100 dark:hover:bg-zinc-900 text-neutral-600 dark:text-neutral-400"
                            onClick={() => toggleGroup(index)}
                        >
                            <p>
                                {index + 1}. {item.categoryTitle}
                            </p>
                            <ChevronRight
                                className={clsx(
                                    "transition-transform duration-200 ease-in-out",
                                    isCategoryOpen && "rotate-90",
                                )}
                            />
                        </button>
                        <div
                            className={clsx(
                                "grid transition-all duration-200 ease-in-out",
                                isCategoryOpen
                                    ? "grid-rows-[1fr] opacity-100"
                                    : "grid-rows-[0fr] opacity-0",
                            )}
                        >
                            <div className="flex flex-col gap-1 pl-2 overflow-hidden">
                                {item.items.map((subItem, subIndex) => {
                                    const isActive = pathname === subItem.href;

                                    return (
                                        <Link
                                            key={subIndex}
                                            href={subItem.href}
                                            className={clsx(
                                                "w-full px-2 py-1 rounded-lg transition-all duration-150 ease-in-out",
                                                isActive
                                                    ? "font-bold bg-neutral-200 dark:bg-zinc-900"
                                                    : "text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-zinc-900",
                                            )}
                                        >
                                            {subItem.title}
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
