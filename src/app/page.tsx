import Avatar from "@/components/avatar/avatar";
import WorkGrid from "@/components/works/work_grid";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
    return (
        <div className="flex flex-col items-center justify-center bg-zinc-50 dark:bg-neutral-950">
            <div className="flex flex-col items-center justify-center gap-6 min-h-screen p-8">
                <div className="flex flex-row items-center justify-center gap-8">
                    <Avatar />
                    <div className="flex flex-col">
                        <div className="text-gray-500 text-lg font-normal">
                            Kosen Student
                        </div>
                        <h1>Hatya</h1>
                    </div>
                </div>

                <div className="flex flex-row items-center gap-6">
                    <Link
                        className="rounded-full bg-black dark:bg-white size-12 p-2 hover:opacity-80 transition-opacity"
                        href="https://github.com/hatya-mouse"
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

                    <Link
                        className="rounded-full bg-black dark:bg-white size-12 p-3 hover:opacity-80 transition-opacity"
                        href="https://x.com/hatyanezu_mouse"
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

                    <Link
                        className="rounded-full bg-black dark:bg-white size-12 p-2 hover:opacity-80 transition-opacity"
                        href="mailto:shuntar30@gmail.com"
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
                </div>
            </div>

            <div className="flex flex-col items-center py-8 px-8 md:px-16 w-full bg-zinc-100 dark:bg-neutral-900">
                <div className="flex flex-col gap-4 items-center justify-center w-full max-w-6xl">
                    <h2>Profile</h2>
                    <ul>
                        <li>Full Name: Shuntaro Kasatani / 笠谷春太朗</li>
                        <li>Age: 15</li>
                        <li>
                            Affiliation: National Institute of Technology
                            (KOSEN), Nagano College
                        </li>
                    </ul>

                    <h2>Works</h2>
                    <WorkGrid />
                </div>
            </div>
        </div>
    );
}
