"use client"

import { AvatarGroup } from "primereact/avatargroup";
import AppAvatar from "./avatar";
import { AvatarProps } from "primereact/avatar";
import { IInbox } from "../../types/inbox";

const url = process.env.PUBLIC_URL || ""
function AppAvatarGroup({inbox, avatar}: {avatar?: AvatarProps, inbox?: IInbox}) { 
    return (
        <AvatarGroup 
            style={{width: "51px"}} 
            className="flex justify-center"
        >
            {
                inbox?.inboxGroup == "group" &&
                <AppAvatar 
                    shape="circle" 
                    image={url + "/icons/person-1.svg"} 
                    style={{
                        background: "#E0E0E0",
                    }}
                />
            }

            <AppAvatar 
                label="F"
                shape="circle" 
                image={url + "/icons/person-2.svg"} 
                style={{
                    background: "#2F80ED",
                    color: "white"
                }}
            />
        </AvatarGroup>
    )

}

export default AppAvatarGroup;