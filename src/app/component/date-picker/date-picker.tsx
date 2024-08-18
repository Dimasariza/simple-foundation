import { Calendar } from "primereact/calendar";
import { Nullable } from "primereact/ts-helpers";
import { useState } from "react";
import styled from "styled-components";
import './date-picker.scss'

const DatePicker = styled(Calendar)`
    border-radius: 0;
    margin: 2rem;

    .p-inputtext {
        background: red;
        border-radius: 0;
    }

    .p-datepicker-trigger {
        background: none !important;
        border: none;
        border-radius: 0;
        right: 4rem !important;
    }

`  


export default DatePicker;