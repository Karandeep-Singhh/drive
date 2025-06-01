import { Clock, Share2, Star, Trash2, FileQuestion, HardDrive } from "lucide-react";
import type { TTab } from "./types";



export const tabs: TTab[] = [
    {
        id: "my-drive",
        label: "My Drive",
        icon: HardDrive,
    },
    {
        id: "recent",
        label: "Recent",
        icon: Clock,
    },
    {
        id: "shared",
        label: "Shared",
        icon: Share2,
    },
    {
        id: "starred",
        label: "Starred",
        icon: Star,
    },
    {
        id: "trash",
        label: "Trash",
        icon: Trash2,
    },
    {
        id: "storage",
        label: "Storage",
        icon: FileQuestion,
    }
]