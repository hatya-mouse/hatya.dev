import avatars from "./avatar_dates.json";
import Image from "next/image";

const normal_avatar = {
    name: "normal",
    path: "/avatar/normal.png",
};

export default function Avatar() {
    // Get the current date and format it as "MM-DD"
    const now = new Date();
    const today = `${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;

    const currentAvatar =
        avatars.find((a) => today >= a.start && today <= a.end) ||
        normal_avatar;

    return (
        <div>
            <Image
                src={currentAvatar?.path}
                alt={currentAvatar?.name}
                className="rounded-full"
                width={128}
                height={128}
                loading="eager"
            />
        </div>
    );
}
