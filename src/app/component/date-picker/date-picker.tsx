import { Calendar } from "primereact/calendar";
import styled from "styled-components";
import './date-picker.scss'

const AppDatePicker = styled(Calendar)`
    border-radius: 0;
    height: 40px;
    width: 193px;

    .p-inputtext {
        border-radius: 5px;
        border: 1px solid #d9d9d9;
    }

    .p-datepicker-trigger {
        position: absolute;
        background: none !important;
        border: none;
        border-radius: 0;
        right: 0;
        padding: 0;
        width: 16px;
        height: 16px;
        top: 12px;
        right: 13px;
        bottom: 12px;
    }

`  

export default AppDatePicker;