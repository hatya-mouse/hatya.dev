import Link from "next/link";
import Avatar from "./avatar/avatar";

export default function Header() {
    return (
        <header className="fixed backdrop-blur-lg top-0 left-0 right-0 h-12 px-4 header-color">
            <div className="flex flex-col justify-center items-center h-full w-full">
                <Link className="flex flex-row gap-3 items-center" href="/">
                    <Avatar width={28} height={28} />
                    <span className="text-xl font-bold">Hatya</span>
                </Link>
            </div>
        </header>
    );
}
