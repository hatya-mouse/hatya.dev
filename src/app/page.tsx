import Avatar from "@/components/avatar/avatar";
import WorkGrid from "@/components/works/work_grid";

export default function Home() {
    const mailAddress = "shuntar30@gmail.com";

    return (
        <div className="flex flex-col items-center justify-center bg-zinc-50 dark:bg-neutral-950">
            <div className="flex flex-row items-center justify-center gap-8 min-h-screen px-8">
                <Avatar />
                <div className="flex flex-col">
                    <div className="text-gray-500 text-lg font-normal">
                        Kosen Student
                    </div>
                    <h1>Hatya</h1>
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

                    <h2>Contact</h2>
                    <p>Email: {mailAddress}</p>
                </div>
            </div>
        </div>
    );
}
