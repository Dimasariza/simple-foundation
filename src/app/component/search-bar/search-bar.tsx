"use client"

import { InputText } from "primereact/inputtext";
import styled from "styled-components";
const url = process.env.PUBLIC_URL

const Input = styled(InputText)`
    width: 581px;
    height: 40px;
    padding-left: 1rem;
    border: 1px solid #828282;
    border-radius: 5px;

    &::placeholder {
        color: #333333;
        padding: 4rem;
    }
`;

const InputWrapper = styled.div`
    position: relative;
    width: fit-content;
`

const SearchIcon = styled.img`
    position: absolute;
    top: 14px;
    bottom: 14px;
    right: 86px;
    width: 12px;
    height: 12px;
`

const AppSearchBar = (props: any) => {
    return (
        <InputWrapper>
            <SearchIcon src={url + "/icons/searchbar-icon.svg"}  alt="search icons" />
            <Input {...props} />
        </InputWrapper>
    )
}

export default AppSearchBar;