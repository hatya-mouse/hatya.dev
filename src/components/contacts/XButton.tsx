import Image from "next/image";
import Link from "next/link";

export default function XButton() {
    return (
        <Link
            className="rounded-full bg-black dark:bg-white size-10 p-3 hover:opacity-80 transition-opacity"
            href="https://x.com/hatyanezu_mouse"
            target="_blank"
            rel="noopener noreferrer"
        >
            <picture>
                <source
                    srcSet="/icons/x_black.png"
                    media="(prefers-color-scheme: dark)"
                />
                <Image
                    src="/icons/x_white.png"
                    alt="GitHub"
                    width={32}
                    height={32}
                />
            </picture>
        </Link>
    );
}
