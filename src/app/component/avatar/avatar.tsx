"use client"

import { Avatar, AvatarProps } from "primereact/avatar";
import styled from "styled-components";

const AvatarStyle = styled(Avatar)`
    width: 34px;
    height: 34px;
    border: none;
    background: #2F80ED;

    img {
        width: 18px;    
        height: 18px;
    }
`

function AppAvatar(props: AvatarProps) {
    return <AvatarStyle {...props} shape="circle" />
}


export default AppAvatar;