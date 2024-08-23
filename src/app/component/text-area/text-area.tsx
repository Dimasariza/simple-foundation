import { InputTextarea, InputTextareaProps } from "primereact/inputtextarea";
import styled from "styled-components";

const StyledTextArea = styled(InputTextarea)`
    font-family: var(--font-lato);
    border-radius: 5px;
    font-size: 16px;
`

function AppTextArea(props: InputTextareaProps) {
    return (
        <StyledTextArea {...props} className={`${props.className} rounded-[5px] border-primary-gray2 tracking-[-0.045em] leading-5`}/>
    )
}

export default AppTextArea;