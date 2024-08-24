"use client"

import { InputText } from "primereact/inputtext";
import styled from "styled-components";

const   AppInput = styled(InputText)`
    font-family: var(--font-lato);
    height: 40px;
    font-size: 16px;
    border: 1px solid #828282;

    &::placeholder {
        opacity: 0.5;
        color: black;
    }
`;

export default AppInput;