import Image from "next/image";
import { InputText, InputTextProps } from "primereact/inputtext";
const url = process.env.PUBLIC_URL || ""

const AppMainSearchBar = (props: InputTextProps) => {
    return (
        <div className="!fixed top-0 right-0">
            <Image 
                src={url + `/icons/main-search.svg`}  
                alt="search icons" 
                className="absolute top-[19px] left-[26px] bottom-[23px] w-4 h-4"
                width={16}
                height={16}
            />
            <InputText 
                {...props} 
                className="w-[1637px] h-[58px] px-[4rem] rounded-0 bg-primary-gray1 border-none font-lato text-white
                placeholder:font-lato placeholder:opacity-100 placeholder:text-white placeholder: " 
            />
        </div>
    )
}

export default AppMainSearchBar;