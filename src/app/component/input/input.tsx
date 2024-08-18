"use client"

import { InputText } from "primereact/inputtext";
import styled from "styled-components";

const AppInput = styled(InputText)`
    margin: 1rem;
    width: 1000px;
    height: 10px;

    &::placeholder {
        font-weight: bold;
        opacity: 0.5;
        color: red;
        padding: 4rem;
    }
`;


export default AppInput;