import Image from "next/image";
import { InputText, InputTextProps } from "primereact/inputtext";
const url = process.env.PUBLIC_URL || ""

const AppSearchBar = (props: InputTextProps) => {
    return (
        <div className="relative w-full">
            <Image 
                src={url + "/icons/searchbar-icon.svg"} 
                alt="search icons" 
                className="absolute top-[9px] right-[60px] w-[12px] h-[12px]"
                width={12}
                height={12}
            />
            <InputText {...props} className="w-full h-[32px] border border-primary-gray2 rounded-border-rad font-lato placeholder:text-primary-maingray placeholder:pl-[44px] text-16" />
        </div >
    )
}

export default AppSearchBar;