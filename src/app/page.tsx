import Avatar from "@/components/avatar";

export default function Home() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
            <div className="flex flex-row items-center justify-center gap-8">
                <Avatar />
                <div className="flex flex-col">
                    <div className="text-gray-500 text-lg font-normal">
                        Kosen Student
                    </div>
                    <h1>Hatya</h1>
                </div>
            </div>
        </div>
    );
}
