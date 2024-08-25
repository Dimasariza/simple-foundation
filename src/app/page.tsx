"use client"

import React, { useEffect, useRef, useState } from "react";

import { locale, addLocale } from 'primereact/api';
import AppMainSearchBar from "./component/main-search-bar/main-search-bar";
import AppInbox from "./component/inbox/inbox";
import AppTaskList from "./component/task-list/task-item-container";
import AppQuickButton from "./component/quick-button/quick-button";
import { useSelector } from "react-redux";
import { AnimatePresence } from "framer-motion";
import AppChatContainer from "./component/message-container/message-container";
 
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
      <AppMainSearchBar />

      <AnimatePresence>
        { switchQuickTabs() }
      </AnimatePresence>

      <AppQuickButton />
    </div>
  );
}