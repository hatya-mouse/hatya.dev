import Link from "next/link";
import Avatar from "../avatar/avatar";

export default function Header() {
    return (
        <header className="fixed backdrop-blur-lg top-0 left-0 right-0 flex flex-row h-12 px-4 justify-center header-color">
            <Link className="flex flex-row gap-3 items-center" href="/">
                <Avatar width={28} height={28} />
                <h4>Hatya</h4>
            </Link>
        </header>
    );
}
