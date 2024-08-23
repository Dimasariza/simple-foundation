import { Calendar, CalendarProps } from "primereact/calendar";
import styled from "styled-components";
import './date-picker.scss'
import Image from "next/image";
const url = process.env.PUBLIC_URL || ""

const DatePicker = styled(Calendar)`
    border-radius: 0;
    height: 40px;
    width: 193px;

    .p-inputtext {
        border-radius: 5px;
        font-family: var(--font-lato);
        border: 1px solid #828282;
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
    
    .p-datepicker-month {
        font-family: var(--font-lato);
    }

`  

function AppDatePicker(props: CalendarProps) {
    return (    
        <DatePicker {...props} selectOtherMonths={false} showOtherMonths={false} showIcon className={`${props.className} border-primary-gray2`}
        icon={() => <Image width={100} height={100} alt="calendar" src={url + "/icons/calendar.svg"} />} />
    )
}

export default AppDatePicker;