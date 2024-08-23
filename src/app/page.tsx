"use client"

import React from "react";

import { locale, addLocale } from 'primereact/api';
import AppMainSearchBar from "./component/main-search-bar/main-search-bar";
import AppInbox from "./component/inbox/inbox";
import AppTaskList from "./component/task-list/task-list";
import AppQuickButton from "./component/quick-button/quick-button";
import { useSelector } from "react-redux";
import AppGroupChatInbox from "./component/chat-container/group-chat-inbox";
import { AnimatePresence } from "framer-motion";
import AppChatContainer from "./component/chat-container/chat-messege";
 
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
        } else if(tab.name == "Group-Inbox") {
          return <AppChatContainer />;
        } else if(tab.name == "Personal-Inbox") {
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