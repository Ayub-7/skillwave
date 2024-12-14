import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem
} from "@nextui-org/navbar";
import { Link } from "@nextui-org/link";
import { Tooltip } from "@nextui-org/tooltip";
import { Button } from "@nextui-org/button";
import React from "react";
import { CircleDollarSign } from "lucide-react";
import UserAvatar from '@/app/ui/user-avatar-server';
import { ThemeSwitcher } from "@/app/ui/theme-switcher";
import ThemeLogo from '@/app/ui/theme-logo';
import { auth } from "@/auth"

export default async function NavBar() {
    const session = await auth();
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
                    {!session &&
                        <Link href="/dashboard/billing">
                            <Tooltip content='Pricing'>
                                <NavbarItem>
                                    <Button isIconOnly><CircleDollarSign /></Button>
                                </NavbarItem>
                            </Tooltip>
                        </Link>
                    }
                    <UserAvatar />
                </NavbarContent>
            </Navbar>
        </div>
    );
}
