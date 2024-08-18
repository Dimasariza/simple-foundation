import { Calendar } from "primereact/calendar";
import { Nullable } from "primereact/ts-helpers";
import { useState } from "react";
import styled from "styled-components";

const DatePicker = styled(Calendar)`
    border-radius: 0;
    margin: 2rem;

    input {
        background: red;
        border-radius: 0;
    }

`  


export default DatePicker;