"use client"

import { AvatarGroup } from "primereact/avatargroup";
import AppAvatar from "./avatar";

const url = process.env.PUBLIC_URL
function AppAvatarGroup() { 
    return (
        <AvatarGroup>
            <AppAvatar shape="circle" image={url + "/icons/person-1.svg"} pt={{
                image: {
                    width: "18px",
                    height: "18px"
                }
            }}
            style={{
                background: "#E0E0E0",
            }}
            />

            <AppAvatar shape="circle" image={url + "/icons/person-2.svg"} pt={{
                image: {
                    width: "18px",
                    height: "18px"
                }
            }}
            style={{
                background: "#2F80ED",
            }}
            />
        </AvatarGroup>
    )

}

export default AppAvatarGroup;