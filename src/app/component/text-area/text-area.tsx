import { InputTextarea, InputTextareaProps } from "primereact/inputtextarea";

function AppTextArea(props: InputTextareaProps) {
    const className = `rounded-border-rad font-lato text-16 border-primary-gray2 tracking-[-0.045em] leading-5 ${props?.className ?? ""}`
    return (
        <InputTextarea 
            {...props} 
            className={className}
        />
    )
}

export default AppTextArea;