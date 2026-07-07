import { MenuItem } from "@/components/quantum-ja/QuantumLinkMenu";

export type FlatNavItem = {
    title: string;
    href: string;
};

export type NavigationPagination = {
    previous: FlatNavItem | null;
    next: FlatNavItem | null;
};

/**
 * Flattens a nested menu structure into a flat list of ordered navigation items.
 */
export function flattenMenu(menu: MenuItem[]): FlatNavItem[] {
    const flatList: FlatNavItem[] = [];

    for (const item of menu) {
        if (item.type === "page") {
            flatList.push({ title: item.title, href: item.href });
        } else if (item.type === "group") {
            for (const subItem of item.items) {
                flatList.push({ title: subItem.title, href: subItem.href });
            }
        }
    }

    return flatList;
}

/**
 * Generates navigation pagination (previous and next items) based on the current page's href.
 */
export function getNavigationPagination(
    menu: MenuItem[],
    currentHref: string,
): NavigationPagination {
    const flatList = flattenMenu(menu);

    const currentIndex = flatList.findIndex(
        (item) => item.href === currentHref,
    );

    if (currentIndex === -1) {
        return { previous: null, next: null };
    }

    const previous = currentIndex > 0 ? flatList[currentIndex - 1] : null;
    const next =
        currentIndex < flatList.length - 1 ? flatList[currentIndex + 1] : null;

    return { previous, next };
}
