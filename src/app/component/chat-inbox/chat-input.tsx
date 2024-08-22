"use client"

import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import styled from "styled-components";

const InputStyled = styled(InputText)`
`


function AppChatInput() {
    return (
        <div className="flex gap-[13px] px-[20px] pb-[20px]">
            <InputStyled className="w-full h-[40px] border-primary-gray2 border"/>
            <Button label="Send" className="bg-primary-blue h-[40px] "/>
        </div>
    )
}

export default AppChatInput;