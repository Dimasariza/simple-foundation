import { Avatar, AvatarProps } from "primereact/avatar";

function AppAvatar(props: AvatarProps) {
    const className = `w-[34px] h-[34px] border-none [&>img]:w-[18px] [&>img]:h-[18px] ${props?.className ?? ""}`
    return <Avatar
        {...props} 
        shape="circle" 
        className={className}
    />
}

export default AppAvatar;