import { notFound } from "next/navigation";
import { getNavigationPagination } from "@/utils/quantum-ja/docOrder";
import { Metadata } from "next";
import LinkCard from "@/components/quantum-ja/LinkCard";
import LinkCardGroup from "@/components/quantum-ja/LinkCardGroup";
import QuantumCredit from "@/components/quantum-ja/QuantumCredit";

interface PageProps {
    params: Promise<{ slug?: string[] }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    if (!slug) notFound();

    const courseId = slug[0];
    const subPaths = slug.slice(1);
    const mdxRelativePath =
        subPaths.length === 0 ? "intro" : subPaths.join("/");

    let metadata;

    try {
        const [mdxModule,] = await Promise.all([
            import(`@/contents/quantum-ja/${courseId}/${mdxRelativePath}.mdx`),
            import(`@/contents/quantum-ja/${courseId}/index.ts`),
        ]);
        metadata = mdxModule.metadata;
    } catch (error) {
        console.error("Failed to load mdx or menu config:", error);
        return {
            title: "Quantum Computing",
            description: "Quantum Computing",
            keywords: ["quantum computing", "量子コンピュータ"],
        }
    }

    return {
        title: metadata.title,
        description: metadata.description,
        keywords: metadata.keywords,
    }
}

export default async function QuantumDynamicPage({ params }: PageProps) {
    const { slug } = await params;

    if (!slug) notFound();

    // The first element of the slug array is the course ID
    const courseId = slug[0];
    // And the rest are the sub-paths for the MDX file
    const subPaths = slug.slice(1);

    const mdxRelativePath =
        subPaths.length === 0 ? "intro" : subPaths.join("/");
    const currentHref = `/quantum-ja/${slug.join("/")}`;

    let MDXContent;
    let menuContents;
    let isTranslation: boolean | undefined = undefined;

    try {
        const [mdxModule, menuModule] = await Promise.all([
            import(`@/contents/quantum-ja/${courseId}/${mdxRelativePath}.mdx`),
            import(`@/contents/quantum-ja/${courseId}/index.ts`),
        ]);

        MDXContent = mdxModule.default;
        menuContents = menuModule.menuContents;
        isTranslation = mdxModule.metadata?.isTranslation ?? false;
    } catch (error) {
        console.error("Failed to load mdx or menu config:", error);
        notFound();
    }

    const { previous, next } = getNavigationPagination(
        menuContents,
        currentHref,
    );

    let previousDescription = undefined;
    let nextDescription = undefined;

    if (previous) {
        try {
            const prevSubPath = previous.href.replace(
                `/quantum-ja/${courseId}`,
                "",
            );
            const prevMdxPath =
                prevSubPath === "" ? "intro" : prevSubPath.slice(1);

            const prevModule = await import(
                `@/contents/quantum-ja/${courseId}/${prevMdxPath}.mdx`
            );
            previousDescription = prevModule.metadata?.description;
        } catch (e) {
            console.error("Failed to load previous page metadata", e);
        }
    }

    if (next) {
        try {
            const nextSubPath = next.href.replace(
                `/quantum-ja/${courseId}`,
                "",
            );
            const nextMdxPath =
                nextSubPath === "" ? "intro" : nextSubPath.slice(1);

            const nextModule = await import(
                `@/contents/quantum-ja/${courseId}/${nextMdxPath}.mdx`
            );
            nextDescription = nextModule.metadata?.description;
        } catch (e) {
            console.error("Failed to load next page metadata", e);
        }
    }

    return (
        <article className="max-w-none w-full flex flex-col gap-4">
            <MDXContent />

            <hr className="my-4" />

            <LinkCardGroup>
                {previous && (
                    <LinkCard
                        type="previous"
                        href={previous.href}
                        title={previous.title}
                        description={previousDescription}
                    />
                )}
                {next && (
                    <LinkCard
                        type="next"
                        href={next.href}
                        title={next.title}
                        description={nextDescription}
                    />
                )}
            </LinkCardGroup>

            <hr className="my-4" />

            <QuantumCredit notTranslated={!(isTranslation ?? true)} />
        </article>
    );
}
