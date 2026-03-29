// Validates the work data yaml files.
import { z } from "zod";

const TechStack = z.enum([
    "Swift",
    "SwiftUI",
    "UIKit",
    "Metal",
    "Rust",
    "C",
    "C++",
    "C#",
    "JavaScript",
    "TypeScript",
    "React",
    "Next.js",
    "HTML",
    "CSS",
    "Python",
    "GDScript",
    "GDShader",
    "Arduino",
    "Raspberry Pi",
    "Unity",
    "Godot",
    "Scratch",
]);

export const WorkSchema = z.object({
    id: z.string(),
    name: z.string(),
    year: z.number(),
    tech: z.array(TechStack),
    description: z.string(),
    thumbnail: z.string(),
    links: z.object({
        repository: z.url().optional(),
        demo: z.url().optional(),
        embed: z.url().optional(),
    }),
});

export type Work = z.infer<typeof WorkSchema>;
