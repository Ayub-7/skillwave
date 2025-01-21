'use client';
import React from 'react';
import { LogInIcon, LucideMenu, Wallet, Eye } from 'lucide-react';
import { FaSquareXTwitter } from "react-icons/fa6";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/dropdown";

export default function SigninDropdown() {
  return (
    <Dropdown placement='bottom-start'>
      <DropdownTrigger>
        <LucideMenu size={30} />
      </DropdownTrigger>
      <DropdownMenu variant="flat">
        <DropdownItem
          key="signin"
          href="/login"
          endContent={<LogInIcon />}
        >
          Sign in
        </DropdownItem>
        <DropdownItem
          key="pricing"
          href="/dashboard/billing"
          endContent={<Wallet />}
        >
          Pricing
        </DropdownItem>
        <DropdownItem
          key="contact"
          href="/dashboard"
          endContent={<Eye />}
        >
          Browse Courses
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}