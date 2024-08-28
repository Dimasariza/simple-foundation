"use client";

import { useSelector } from "react-redux";
import { AnimatePresence } from "framer-motion";
import AppInbox from "@/pages/inbox/inbox";
import AppChatContainer from "@/pages/message/message-container";
import AppTaskList from "@/pages/task-list/task-item-container";
import AppMainSearchBar from "@/component/main-search-bar/main-search-bar";
import AppQuickButton from "@/pages/quick-button/quick-button";
import { RootState } from "@/redux/root";

function MainLayout() {
    const { tab } = useSelector((state: RootState) => state.QuickTabsReducer);

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
    )
}

export default MainLayout;