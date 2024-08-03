'use client';

import React from 'react';
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from '@nextui-org/dropdown';
import { signOutAction } from '@/app/lib/actions';
import { Avatar } from '@nextui-org/avatar';

export default function UserAvatarClient({ user }: any) {
  return (
    <Dropdown placement="bottom-start">
      <DropdownTrigger>
        <Avatar
          isBordered
          as="button"
          className="transition-transform"
          src="https://i.pravatar.cc/150?u=a04258a2462d826712d"
          size="md"
          color="primary"
        />
      </DropdownTrigger>
      <DropdownMenu aria-label="User Actions" variant="flat">
        <DropdownItem key="details" className="h-14 gap-2">
          <p className="font-bold">Signed in as</p>
          <p className="font-bold">{user.name}</p>
        </DropdownItem>
        <DropdownItem key="profile" href="/dashboard/profile">My Profile</DropdownItem>
        <DropdownItem
          key="logout"
          color="danger"
          onClick={async () => {
            await signOutAction();
          }}
        >
          Log Out
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
