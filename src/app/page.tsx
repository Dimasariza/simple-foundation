"use client"

import React, { ReactNode } from "react";
import { Calendar } from 'primereact/calendar';
import { Nullable } from "primereact/ts-helpers";

import { locale, addLocale } from 'primereact/api';
import { InputText } from "primereact/inputtext";
import AppInput from "./component/input/input";
import AppSearchBar from "./component/search-bar/search-bar";
import { AvatarGroup } from "primereact/avatargroup";
import { Avatar } from "primereact/avatar";
import AppAvatar from "./component/avatar/avatar";
import AppAvatarGroup from "./component/avatar/avatar-group";
import AppDatePicker from "./component/date-picker/date-picker";
import AppMainSearchBar from "./component/main-search-bar/main-search-bar";
import AppInbox from "./component/inbox/inbox";
 
export default function Home() {
  const [date, setDate] = React.useState<Nullable<Date>>(null);

  addLocale('es', {
    firstDayOfWeek: 1,
    dayNamesMin: ['S', 'M', 'T', 'W', 'Th', 'F', 'S'],
  });

  locale('es')
 
  return (
    <div>

      <AppMainSearchBar />

      <AppDatePicker value={date} onSelect={(e: any) => { setDate(e.value) }} selectOtherMonths={false} showOtherMonths={false} showIcon 
      icon={() => <img src="/icons/calendar.svg" />} />

      <AppAvatarGroup />

      <AppInbox />


    </div>
  );
}