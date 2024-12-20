"use client";

import { useTheme } from "next-themes";
import TinyLaunchBadge from "@/public/tinylaunch_badge_2";
import TinyLaunchBadgeDark from "@/public/tinylaunchDark";

export default function ThemeBadge() {
    const { theme } = useTheme();

    return (
        <a
            href="https://tinylaun.ch"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:scale-105 transition-transform"
        >
            {theme === "dark" ? (
                <TinyLaunchBadgeDark className="h-12 w-auto" />
            ) : (
                <TinyLaunchBadge className="h-12 w-auto" />
            )}
        </a>
    );
}
