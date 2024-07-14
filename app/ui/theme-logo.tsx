'use client'
import Image from 'next/image';
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeImage() {
    const { theme } = useTheme();
    const [currentTheme, setCurrentTheme] = useState();

    useEffect(() => {
        if (theme !== undefined) {
            setCurrentTheme(theme);
        }
    }, [theme]);

    if (!currentTheme) return null;

    return (
        <Image
            src={`/SW-${currentTheme}-sm.png`}
            width={80}
            height={80}
            alt="SW logo"
        />
    )
}
