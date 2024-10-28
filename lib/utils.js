import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
    return twMerge(clsx(inputs));
}

export const formatPrice = (price) => {
    const formatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "IDR",
    });

    return formatter.format(price);
};

export function constructMetadata({
    title = "CutieStuff",
    description = "Create custom high-quality phone cases in seconds",
    image = "/logo cutiestuff.png",
    icons = "/favicon.ico",
} = {}) {
    return {
        title,
        description,
        openGraph: {
            title,
            description,
            images: [{ url: image }],
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: [image],
            creator: "",
        },
        icons,
        metadataBase: new URL("https://cutiestuff.vercel.app/"),
    };
}
