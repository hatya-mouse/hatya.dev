import fs from "fs";
import path from "path";
import { parse } from "yaml";

const PROJECTS_DIR = path.join(process.cwd(), "public/works");
const OUTPUT_FILE = path.join(process.cwd(), "src/generated/works.ts");

function generate() {
    const folders = fs.readdirSync(PROJECTS_DIR);
    folders.filter((f) => !f.startsWith("."));

    const works = folders
        .map((folder) => {
            let yamlPath = path.join(PROJECTS_DIR, folder, "data.yml");

            if (!fs.existsSync(yamlPath)) {
                // Fallback to .yaml
                yamlPath = path.join(PROJECTS_DIR, folder, "data.yaml");
                if (!fs.existsSync(yamlPath)) return null;
            }

            const fileContent = fs.readFileSync(yamlPath, "utf8");
            const data = parse(fileContent);

            return {
                id: folder,
                ...data,
            };
        })
        .filter(Boolean);

    const content = `// This file is auto-generated. Do not edit.
export const works = ${JSON.stringify(works, null, 4)} as const;
export type Work = typeof works[number];`;

    fs.mkdirSync(path.dirname(OUTPUT_FILE), { recursive: true });
    fs.writeFileSync(OUTPUT_FILE, content);
}

generate();
