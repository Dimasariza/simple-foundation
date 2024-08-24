"use client"

import React, { useState } from "react";

import { locale, addLocale } from 'primereact/api';
import AppMainSearchBar from "./component/main-search-bar/main-search-bar";
import AppInbox from "./component/inbox/inbox";
import AppTaskList from "./component/task-list/task-list";
import AppQuickButton from "./component/quick-button/quick-button";
import { useSelector } from "react-redux";
import { AnimatePresence } from "framer-motion";
import AppChatContainer from "./component/chat-container/chat-messege";
import { Panel } from "primereact/panel";
import AppTextArea from "./component/text-area/text-area";
import AppCard from "./component/card/card";
import { ListBox } from "primereact/listbox";
import AppInput from "./component/input/input";
 
export default function Home() {
  addLocale('es', {
    firstDayOfWeek: 1,
    dayNamesMin: ['S', 'M', 'T', 'W', 'Th', 'F', 'S'],
  });

  locale('es');

  const { tab } = useSelector((state: any) => state.QuickTabsReducer);

  const switchQuickTabs = () => {
    switch(tab?.group) {
      case "Inbox":
        if(tab?.name == "Inbox") {
          return <AppInbox />;
        } else {
          return <AppChatContainer />;
        } 
      case "Task":
        return <AppTaskList />;
      default:
        return 
    }
  }

  return (
    <div>
      {/* <AppMainSearchBar /> */}


        <AnimatePresence>
          { switchQuickTabs() }
        </AnimatePresence>

      <AppQuickButton />
    </div>
  );
}