import { useSelector } from "react-redux";
import AppInbox from "../page/inbox/inbox";
import AppChatContainer from "../page/message/message-container";
import AppTaskList from "../page/task-list/task-item-container";
import AppMainSearchBar from "../component/main-search-bar/main-search-bar";
import { AnimatePresence } from "framer-motion";
import AppQuickButton from "../page/quick-button/quick-button";

function MainLayout() {
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
        <>
            <AppMainSearchBar />

            <AnimatePresence>
                { switchQuickTabs() }
            </AnimatePresence>
    
            <AppQuickButton />
        </>
    )
}

export default MainLayout;