// app/components/ThemeSwitcher.tsx
"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Switch } from "@heroui/switch";
import { MoonIcon } from "@/app/ui/custom-icons/moon-icon";
import { SunIcon } from "@/app/ui/custom-icons/sun-icon";

export function ThemeSwitcher() {
    const [mounted, setMounted] = useState(false)
    const { theme, setTheme } = useTheme()

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return null

    const handleThemeChange = (isSelected: boolean) => {
        setTheme(isSelected ? "dark" : "light");
    };

    return (
        <div>
            <Switch
                defaultSelected={theme === "dark"}
                onValueChange={handleThemeChange}
                size="md"
                startContent={<SunIcon />}
                endContent={<MoonIcon />}
            >
            </Switch>
        </div>
    );
};