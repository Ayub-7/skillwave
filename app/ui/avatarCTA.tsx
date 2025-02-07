'use client';

import { Avatar, AvatarGroup } from "@heroui/react";

export default function AvatarCTA() {
    return (
        <AvatarGroup
            isBordered
            max={5}
            renderCount={(count) => (
                <div className="text-foreground font-medium ms-2 flex flex-col">
                    <p>Join other <b>creators</b></p>
                    <p>who use <b>skillwave.io</b> to earn cash 💰</p>
                </div>
            )}
            total={25}
        >
            <Avatar src="ayub.png" />
            <Avatar src="face1.png" />
            <Avatar src="face2.png" />
            <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026302d" />
            <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026702d" />
        </AvatarGroup>
    );
}
