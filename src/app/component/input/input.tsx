import { InputText, InputTextProps } from "primereact/inputtext";

function AppInput(props: InputTextProps) {
    const className = `placeholder:text-primary-maingray font-size-16 h-[40px] border-primary-gray2 border font-lato placeholder:opacity-100 ${props?.className ?? ""}`

    return <InputText 
        {...props} 
        className={className}
    />
}

export default AppInput;