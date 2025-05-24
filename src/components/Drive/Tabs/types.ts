export type TTabs = "my-drive" | "recent" | "shared" | "starred" | "trash" | "storage";

export type TTab = {
    id: TTabs;
    label: string;
    icon: React.ElementType;
}