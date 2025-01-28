'use client';

import { Avatar, AvatarGroup } from "@heroui/react";

export default function AvatarCTA() {
    return (
        <AvatarGroup
            isBordered
            max={5}
            renderCount={(count) => (
                <div className="text-foreground font-medium ms-2 flex flex-col">
                    <p>Join over <b>{count}</b> people</p>
                    <p>who use <b>skillwave.io</b> to earn cash 💰</p>
                </div>
            )}
            total={25}
        >
            <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
            <Avatar src="https://i.pravatar.cc/150?u=a04258a2462d826712d" />
            <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026708c" />
            <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026302d" />
            <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026702d" />
        </AvatarGroup>
    );
}
