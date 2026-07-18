import Link from "next/link";

export default function QuantumHeader() {
    return (
        <header className="fixed top-0 left-0 right-0 h-12 px-4 flex flex-row items-center bg-neutral-100 dark:bg-zinc-900 border-b border-b-(--border) z-10">
            <Link
                className="text-xl font-bold hover:text-indigo-500 dark:hover:text-indigo-300 transition-colors duration-200 ease-in-out"
                href="/quantum-ja"
            >
                Quantum Learning 日本語訳
            </Link>
        </header>
    );
}
