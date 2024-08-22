"use client"

import { AvatarGroup } from "primereact/avatargroup";
import AppAvatar from "./avatar";
import { AvatarProps } from "primereact/avatar";
import { IInbox } from "../../types/inbox";

const url = process.env.PUBLIC_URL || ""
function AppAvatarGroup({inbox, avatar}: {avatar?: AvatarProps, inbox?: IInbox}) { 
    return (
        <AvatarGroup 
            className="flex justify-center self-start w-[50px]"
        >
            {
                inbox?.inboxGroup == "group" &&
                <AppAvatar 
                    shape="circle" 
                    image={url + "/icons/person-1.svg"} 
                    className="bg-primary-gray3"
                />
            }

            <AppAvatar 
                label="F"
                shape="circle" 
                image={url + "/icons/person-2.svg"} 
                className="text-white bg-primary-blue"
            />
        </AvatarGroup>
    )

}

export default AppAvatarGroup;