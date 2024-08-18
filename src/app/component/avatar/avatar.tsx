"use client"

import { Avatar } from "primereact/avatar";
import styled from "styled-components";

const AppAvatar = styled(Avatar)`
    width: 34px;
    height: 34px;
    border: none;

    img {
        width: 18px;    
        height: 18px;
    }
`

export default AppAvatar;