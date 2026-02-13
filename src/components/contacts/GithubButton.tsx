import Image from "next/image";
import Link from "next/link";

export default function GithubButton() {
    return (
        <Link
            className="rounded-full bg-black dark:bg-white size-10 p-2 hover:opacity-80 transition-opacity"
            href="https://github.com/hatya-mouse"
            target="_blank"
            rel="noopener noreferrer"
        >
            <picture>
                <source
                    srcSet="/icons/invertocat_black.svg"
                    media="(prefers-color-scheme: dark)"
                />
                <Image
                    src="/icons/invertocat_white.svg"
                    alt="GitHub"
                    width={32}
                    height={32}
                />
            </picture>
        </Link>
    );
}
