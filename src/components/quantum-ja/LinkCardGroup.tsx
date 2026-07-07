export default function LinkCardGroup({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4 my-2">
            {children}
        </div>
    );
}
