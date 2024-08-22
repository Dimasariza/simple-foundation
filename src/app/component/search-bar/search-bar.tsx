"use client"

import { InputText, InputTextProps } from "primereact/inputtext";
import styled from "styled-components";
const url = process.env.PUBLIC_URL || ""

const Input = styled(InputText)`
    width: 100%;
    height: 32px;
    border: 1px solid #828282;
    border-radius: 5px;
    font-family: var(--font-lato);

    &::placeholder {
        color: #333333;
        padding-left: 44px;
        font-size: 16px;
    }
`;

const InputWrapper = styled.div`
    width: 100%;
    position: relative;
`

const SearchIcon = styled.img`
    position: absolute;
    top: 9px;
    right: 60px;
    width: 12px;
    height: 12px;
`

const AppSearchBar = (props: InputTextProps) => {
    return (
        <InputWrapper>
            <SearchIcon src={url + "/icons/searchbar-icon.svg"}  alt="search icons" />
            <Input {...props} />
        </InputWrapper>
    )
}

export default AppSearchBar;