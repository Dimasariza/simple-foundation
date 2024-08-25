import { InputTextarea, InputTextareaProps } from "primereact/inputtextarea";
import { useState } from "react";
import styled from "styled-components";

const StyledTextArea = styled(InputTextarea)`
    font-family: var(--font-lato);
    font-size: 16px;
`

function AppTextArea(props: InputTextareaProps) {
    const [text, setText] = useState<string>();
    const handleChangeInput = (e: any) => {
        setText(e.target.value)
    }
    return (
        <StyledTextArea 
            value={text} 
            {...props} 
            className={`${props.className} rounded-[5px] font-lato text-[16px] border-primary-gray2 tracking-[-0.045em] leading-5`}
        />
    )
}

export default AppTextArea;