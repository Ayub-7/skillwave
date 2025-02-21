"use client";

import { useTheme } from "next-themes";
import TinyLaunchBadge from "@/public/tinylaunch_badge_2";
import TinyLaunchBadgeDark from "@/public/tinylaunchDark";

export default function ThemeBadge() {
    const { theme } = useTheme();

    const imageStyle = {
        width: '225px', height: '54px',
    }

    return (

        theme === "dark" ? (
            <a className="hover:scale-105 transition-transform" href="https://www.producthunt.com/posts/skillwave-io?embed=true&utm_source=badge-featured&utm_medium=badge&utm_souce=badge-skillwave&#0045;io" target="_blank"><img src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=852804&theme=dark&t=1740132937132" alt="skillwave&#0046;io - The&#0032;modern&#0032;platform&#0032;for&#0032;course&#0032;creators | Product Hunt" style={imageStyle} width="250" height="54" /></a>
        ) : (
            <a className="hover:scale-105 transition-transform" href="https://www.producthunt.com/posts/skillwave-io?embed=true&utm_source=badge-featured&utm_medium=badge&utm_souce=badge-skillwave&#0045;io" target="_blank"><img src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=852804&theme=light&t=1740133242401" alt="skillwave&#0046;io - The&#0032;modern&#0032;platform&#0032;for&#0032;course&#0032;creators | Product Hunt" style={imageStyle} width="250" height="54" /></a>
        )
    );
}
