import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem
} from "@nextui-org/navbar";
import { Link } from "@nextui-org/link";
import React from "react";
import UserAvatar from '@/app/ui/user-avatar-server';
import { ThemeSwitcher } from "@/app/ui/theme-switcher";
import ThemeLogo from '@/app/ui/theme-logo';

export default async function NavBar() {
    return (
        <div>
            <Navbar maxWidth="full">
                <NavbarContent>
                    <Link href="/dashboard">
                        <NavbarBrand>
                            <ThemeLogo />
                        </NavbarBrand>
                    </Link>
                </NavbarContent>
                <NavbarContent justify="end">
                    <NavbarItem>
                        <ThemeSwitcher />
                    </NavbarItem>
                    <UserAvatar />
                </NavbarContent>
            </Navbar>
        </div>
    );
}
