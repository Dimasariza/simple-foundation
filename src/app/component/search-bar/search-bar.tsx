"use client"

import { InputText } from "primereact/inputtext";
import styled from "styled-components";

const Input = styled(InputText)`
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
        background-color: red;
    }
`;

const AppSearchBar = (props: any) => {
    return (
        <div>
            <img src="/icons/plus.svg" alt="" />
            <Input {...props} />
        </div>
    )
}

export default AppSearchBar;