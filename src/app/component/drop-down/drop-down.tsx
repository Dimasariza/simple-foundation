import { Dropdown, DropdownProps } from "primereact/dropdown";

function AppDropDown(props: DropdownProps) {
    const className = `${props?.className ?? ""} `
    return (
        <Dropdown className={className} />
    )
}

export default AppDropDown;