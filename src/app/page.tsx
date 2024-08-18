"use client"

import React, { ReactNode } from "react";
import { Calendar } from 'primereact/calendar';
import { Nullable } from "primereact/ts-helpers";

import { locale, addLocale } from 'primereact/api';
import { InputText } from "primereact/inputtext";
import AppInput from "./component/input/input";
 

export default function Home() {
  const [date, setDate] = React.useState<Nullable<Date>>(null);

  addLocale('es', {
    firstDayOfWeek: 1,
    dayNamesMin: ['S', 'M', 'T', 'W', 'Th', 'F', 'S'],
  });

  locale('es')
 
  return (
    <div>
      <AppInput placeholder="Search" />
      {/* <Calendar value={date} onChange={(e) => setDate(e.value)}  icon={() => <i className="pi pi-calendar" />}/> */}
    </div>
  );
}