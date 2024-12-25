import {defaultSize} from "@/processes/constants.ts";

export function querysized(): number {
    let size = defaultSize;
    const hash = window.location.hash;
    const match = hash.match(/size=(\d+)/);
    if (match) {
        const urlSize = parseInt(match[1], 10);
        if (urlSize >= 5 && urlSize <= defaultSize) {
            size = urlSize;
        }
    }
    return size;
}

