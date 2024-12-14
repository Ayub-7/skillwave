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

export default function UserAvatarClient({ image, name, id }: any) {
  return (
    <Dropdown placement="bottom-start">
      <DropdownTrigger>
        <Avatar
          isBordered
          as="button"
          className="transition-transform"
          src={image !== '' && image !== null ? image : "/default-profile-image.png"}
          size="md"
          color="primary"
        />
      </DropdownTrigger>
      <DropdownMenu aria-label="User Actions" variant="flat">
        <DropdownItem key="details" className="h-14 gap-2">
          <p className="font-bold">Signed in as</p>
          <p className="font-bold">{name}</p>
        </DropdownItem>
        <DropdownItem key="profile" href={`/dashboard/profile/${id}`}>My Profile</DropdownItem>
        <DropdownItem color="success" key="billing" href={`/dashboard/billing`}>Billing</DropdownItem>
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
