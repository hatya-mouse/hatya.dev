import { JetBrains_Mono } from "next/font/google";
import Avatar from "@/components/avatar/avatar";
import GithubButton from "@/components/contacts/GithubButton";
import MailButton from "@/components/contacts/MailButton";
import XButton from "@/components/contacts/XButton";
import WorkGrid from "@/components/works/WorkGrid";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

const jetBrains = JetBrains_Mono({
    weight: "500",
    subsets: ["latin"],
});

export default function Home() {
    return (
        <div
            className={`${jetBrains.className} flex flex-col min-h-screen pt-12`}
        >
            <Header />

            <div className="flex flex-col items-center justify-center bg-zinc-100 dark:bg-neutral-900">
                <div className="flex flex-col items-center justify-center gap-4 w-full min-h-screen p-12 bg-zinc-50 dark:bg-neutral-950">
                    <div className="flex flex-row items-center justify-center gap-8">
                        <Avatar />
                        <div className="flex flex-col">
                            <p className="text-gray-500 text-lg font-normal">
                                Kosen Student
                            </p>
                            <p className="text-5xl font-bold mt-2">Hatya</p>
                        </div>
                    </div>

                    <div className="flex flex-row items-center gap-4">
                        <GithubButton />
                        <XButton />
                        <MailButton />
                    </div>
                </div>

                <div className="flex flex-col gap-12 items-center justify-center py-12 px-8 md:px-16 w-full max-w-6xl">
                    <div className="flex flex-col items-center gap-2">
                        <h1>Profile</h1>
                        <ul>
                            <li>Full Name: Shuntaro Kasatani / 笠谷春太朗</li>
                            <li>Birthday: March 19, 2010</li>
                            <li>
                                Affiliation: National Institute of Technology
                                (KOSEN), Nagano College
                            </li>
                        </ul>
                    </div>

                    {/*<div className="flex flex-col items-center gap-4">
                        <h2>Skills</h2>

                        <div className="flex flex-col items-center gap-2">
                            <h4>Web</h4>
                            <TechStacks
                                techs={[
                                    "HTML",
                                    "CSS",
                                    "JavaScript",
                                    "TypeScript",
                                    "React",
                                    "Next.js",
                                ]}
                                centralize
                            />
                        </div>

                        <div className="flex flex-col items-center gap-2">
                            <h4>Systems</h4>
                            <TechStacks techs={["Rust", "C"]} centralize />
                        </div>

                        <div className="flex flex-col items-center gap-2">
                            <h4>App Development</h4>
                            <TechStacks
                                techs={["Swift", "SwiftUI", "UIKit", "Cocoa"]}
                                centralize
                            />
                        </div>

                        <div className="flex flex-col items-center gap-2">
                            <h4>Game</h4>
                            <TechStacks
                                techs={[
                                    "Unity",
                                    "Godot",
                                    "GDScript",
                                    "GDShader",
                                ]}
                                centralize
                            />
                        </div>

                        <div className="flex flex-col items-center gap-2">
                            <h4>Scripting</h4>
                            <TechStacks techs={["Python"]} centralize />
                        </div>

                        <div className="flex flex-col items-center gap-2">
                            <h4>Embedded</h4>
                            <TechStacks
                                techs={["Arduino", "Raspberry Pi"]}
                                centralize
                            />
                        </div>
                    </div>*/}

                    <h1>Works</h1>
                    <WorkGrid />
                </div>
            </div>

            <Footer />
        </div>
    );
}
