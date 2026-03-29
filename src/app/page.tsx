import Avatar from "@/components/avatar/avatar";
import GithubButton from "@/components/contacts/GithubButton";
import MailButton from "@/components/contacts/MailButton";
import XButton from "@/components/contacts/XButton";
import TechStacks from "@/components/works/TechStacks";
import WorkGrid from "@/components/works/WorkGrid";

export default function Home() {
    return (
        <div className="flex flex-col items-center justify-center bg-zinc-50 dark:bg-neutral-950">
            <div className="flex flex-col items-center justify-center gap-4 min-h-screen p-8">
                <div className="flex flex-row items-center justify-center gap-8">
                    <Avatar />
                    <div className="flex flex-col">
                        <div className="text-gray-500 text-lg font-normal">
                            Kosen Student
                        </div>
                        <h1>Hatya</h1>
                    </div>
                </div>

                <div className="flex flex-row items-center gap-4">
                    <GithubButton />
                    <XButton />
                    <MailButton />
                </div>
            </div>

            <div className="flex flex-col items-center py-12 px-8 md:px-16 w-full bg-zinc-100 dark:bg-neutral-900">
                <div className="flex flex-col gap-12 items-center justify-center w-full max-w-6xl">
                    <div className="flex flex-col items-center gap-2">
                        <h2>Profile</h2>
                        <ul>
                            <li>Full Name: Shuntaro Kasatani / 笠谷春太朗</li>
                            <li>Birthday: March 19, 2010</li>
                            <li>
                                Affiliation: National Institute of Technology
                                (KOSEN), Nagano College
                            </li>
                        </ul>
                    </div>

                    <div className="flex flex-col items-center gap-4">
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
                    </div>

                    <h2>Works</h2>
                    <WorkGrid />
                </div>
            </div>
        </div>
    );
}
