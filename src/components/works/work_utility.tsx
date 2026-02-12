import works from "./works.json";

export function getWork(workName: string) {
    return works.find(({ id }) => id == workName);
}
