import GithubButton from "./contacts/GithubButton";
import MailButton from "./contacts/MailButton";
import XButton from "./contacts/XButton";

export default function Footer() {
    return (
        <footer className="flex flex-row items-center justify-between w-full px-4 py-3 mt-auto bg-zinc-200 dark:bg-neutral-800">
            © 2026 Shuntaro Kasatani
            <div className="flex flex-row items-center gap-3">
                <GithubButton />
                <XButton />
                <MailButton />
            </div>
        </footer>
    );
}
