"use client"

import { InputText } from "primereact/inputtext";
import styled from "styled-components";

const input = styled(InputText)`
    margin: 1rem;
    width: 1000px;
    height: 10px;

    &::placeholder {
        font-weight: bold;
        opacity: 0.5;
        color: red;
        padding: 4rem;
    }

    &:hover {
        // background-color: red;
    }
`;

const AppInput = styled(input)`
    &::before {
        content: "🎉";
        display: block;
    }
`


export default AppInput;