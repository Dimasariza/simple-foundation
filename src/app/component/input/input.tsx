"use client"

import { InputText } from "primereact/inputtext";
import styled from "styled-components";

const AppInput = styled(InputText)`
    height: 40px;

    &::placeholder {
        opacity: 0.5;
        color: black;
    }
`;

export default AppInput;