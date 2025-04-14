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
                            href="/dashboard"
                        >
                            Browse
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
                        <Button color="primary" variant="flat" onClick={() => router.push('/login')}>
                            Get Started
                        </Button>
                    </NavbarItem>
                </NavbarContent>
            </Navbar>
        </div>
    );
}
