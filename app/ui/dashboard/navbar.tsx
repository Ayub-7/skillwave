'use client'
import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    Link,
    Button,
} from "@heroui/react";
import React from "react";
import { useRouter } from 'next/navigation';
import ThemeLogo from '@/app/ui/theme-logo';

export default function NavBar() {
    const router = useRouter();

    const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
        e.preventDefault();
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    ;

    return (
        <div>
            <Navbar maxWidth="full">
                <NavbarContent>
                    <Link href="/dashboard">
                        <NavbarBrand className="mt-6">
                            <ThemeLogo />
                        </NavbarBrand>
                    </Link>
                </NavbarContent>
                <NavbarContent className="hidden sm:flex gap-8" justify="center">
                    <NavbarItem>
                        <Link
                            className="font-medium text-lg hover:text-sky-500 transition-colors duration-200"
                            color="foreground"
                            href="#features"
                            onClick={(e) => scrollToSection(e, 'features')}
                        >
                            Features
                        </Link>
                    </NavbarItem>
                    <NavbarItem>
                        <Link
                            className="font-medium text-lg hover:text-sky-500 transition-colors duration-200"
                            color="foreground"
                            href="#pricing"
                            onClick={(e) => scrollToSection(e, 'pricing')}
                        >
                            Pricing
                        </Link>
                    </NavbarItem>
                    <NavbarItem>
                        <Link
                            className="font-medium text-lg hover:text-sky-500 transition-colors duration-200"
                            color="foreground"
                            href="/blogs"
                        >
                            Blog
                        </Link>
                    </NavbarItem>
                </NavbarContent>
                <NavbarContent justify="end">
                    <NavbarItem>
                        <Button
                            color="primary"
                            className="bg-sky-500 hover:bg-sky-600 text-white font-medium px-6 py-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
                            onClick={() => router.push('/login')}
                        >
                            Start Teaching Today →
                        </Button>
                    </NavbarItem>
                </NavbarContent>
            </Navbar>
        </div>
    );
}
