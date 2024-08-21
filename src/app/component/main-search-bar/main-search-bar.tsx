"use client"

import { InputText } from "primereact/inputtext";
import styled from "styled-components";
const url = process.env.PUBLIC_URL

const Input = styled(InputText)`
    width: 1637px;
    height: 58px;
    padding-left: 1rem;
    border-radius: 0;
    background: #4F4F4F;
    border: none;

    &::placeholder {
        font-weight: bold;
        opacity: 0.5;
        color: red;
        padding: 4rem;
    }
`;

const InputWrapper = styled.div`
    position: relative;
    width: fit-content;
    border: none;
`

const SearchIcon = styled.img`
    position: absolute;
    top: 19px;
    left: 26px;
    bottom: 23px;
    width: 16px;
    height: 16px;
`

const AppMainSearchBar = (props: any) => {
    return (
        <InputWrapper className="!fixed top-0 right-0">
            <SearchIcon src={url + `/icons/main-search.svg`}  alt="search icons" />
            <Input {...props} />
        </InputWrapper>
    )
}

export default AppMainSearchBar;