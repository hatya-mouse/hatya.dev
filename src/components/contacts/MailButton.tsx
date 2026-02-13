import Image from "next/image";
import Link from "next/link";

export default function MailButton() {
    return (
        <Link
            className="rounded-full bg-black dark:bg-white size-10 p-2 hover:opacity-80 transition-opacity"
            href="mailto:shuntar30@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
        >
            <picture>
                <source
                    srcSet="/icons/mail_dot_black.png"
                    media="(prefers-color-scheme: dark)"
                />
                <Image
                    src="/icons/mail_dot_white.png"
                    alt="GitHub"
                    width={32}
                    height={32}
                />
            </picture>
        </Link>
    );
}
