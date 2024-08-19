"use client"

import React, { ReactNode, useState } from "react";
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
import AppChatInbox from "./component/chat-inbox/chat-inbox";
import AppTaskList from "./component/task-list/task-list";
import AppCheckBox from "./component/check-box/check-box";
 
export default function Home() {
  const [date, setDate] = useState<Nullable<Date>>(null);

  return (
    <div>

      <AppMainSearchBar />

      <AppDatePicker value={date} onSelect={(e: any) => { setDate(e.value) }} />

      {/* <AppAvatarGroup />

      <AppInbox /> */}

      <AppChatInbox />

      <AppTaskList />


    </div>
  );
}