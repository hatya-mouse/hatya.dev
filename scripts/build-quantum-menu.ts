import fs from "fs";
import path from "path";

export type GeneratedMenuItem =
    | { type: "page"; title: string; href: string; order: number }
    | {
          type: "group";
          categoryTitle: string;
          order: number;
          items: { title: string; href: string; order: number }[];
      };

export async function generateMenuFromMetadata(
    courseSlug: string,
): Promise<GeneratedMenuItem[]> {
    const coursePath = path.join(
        process.cwd(),
        "src/app/quantum-ja",
        courseSlug,
    );
    const baseUrl = `/quantum-ja/${courseSlug}`;

    if (!fs.existsSync(coursePath)) return [];

    const entries = fs.readdirSync(coursePath, { withFileTypes: true });

    const pages: {
        title: string;
        category?: string;
        order: number;
        href: string;
    }[] = [];

    for (const entry of entries) {
        let mdxPath = "";
        let href = baseUrl;

        if (entry.name === "page.mdx") {
            mdxPath = path.join(coursePath, "page.mdx");
        } else if (entry.isDirectory()) {
            const potentialPage = path.join(coursePath, entry.name, "page.mdx");
            if (fs.existsSync(potentialPage)) {
                mdxPath = potentialPage;
                href = `${baseUrl}/${entry.name}`;
            }
        }

        if (mdxPath) {
            try {
                const module = await import(
                    `../app/quantum-ja/${courseSlug}${href.replace(baseUrl, "")}/page.mdx`
                );
                const meta = module.metadata;

                if (meta) {
                    pages.push({
                        title: meta.title || "無題のページ",
                        category: meta.category,
                        order: meta.order ?? 99,
                        href,
                    });
                }
            } catch (e) {
                console.error(`Failed to parse metadata for ${mdxPath}`, e);
            }
        }
    }

    const menuMap = new Map<string, GeneratedMenuItem>();
    const rootPages: GeneratedMenuItem[] = [];

    for (const page of pages) {
        if (!page.category) {
            rootPages.push({
                type: "page",
                title: page.title,
                href: page.href,
                order: page.order,
            });
        } else {
            if (!menuMap.has(page.category)) {
                menuMap.set(page.category, {
                    type: "group",
                    categoryTitle: page.category,
                    order: page.order,
                    items: [],
                });
            }
            const group = menuMap.get(page.category);
            if (group && group.type === "group") {
                group.items.push({
                    title: page.title,
                    href: page.href,
                    order: page.order,
                });
                if (page.order < group.order) group.order = page.order;
            }
        }
    }

    const groups = Array.from(menuMap.values()).map((group) => {
        if (group.type === "group") {
            group.items.sort((a, b) => a.order - b.order);
        }
        return group;
    });

    const finalMenu = [...rootPages, ...groups].sort(
        (a, b) => a.order - b.order,
    );

    return finalMenu;
}
