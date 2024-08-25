"use client"

import { InputText, InputTextProps } from "primereact/inputtext";
import { useRef, useState } from "react";
import styled from "styled-components";

const StyledInput = styled(InputText)`
    font-family: var(--font-lato);
    height: 40px;
    font-size: 16px;
    border: 1px solid #828282;

    &::placeholder {
        opacity: 0.5;
        color: black;
    }
`;

function AppInput(props: InputTextProps) {
    const [text, setText] = useState<string>();
    const handleChangeInput = (e: any) => {
        setText(e.target.value)
    }

    return <StyledInput value={text} {...props}/>
}

export default AppInput;