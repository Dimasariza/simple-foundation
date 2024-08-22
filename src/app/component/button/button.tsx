"use client"

import { Button, ButtonProps } from "primereact/button";
import styled from "styled-components";

const StyledButton = styled(Button)`
`

function AppButton(props: ButtonProps) {
    return (
        <StyledButton {...props} />
    )
}

export default AppButton;