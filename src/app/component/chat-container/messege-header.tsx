import { Button } from "primereact/button";
import { useSelector } from "react-redux";

function ChatHeader({handleBackToInbox, handleCloseMessege}:  any) {
    const { tab: {inbox} } = useSelector((state: any) => state.QuickTabsReducer) || {};

    return (
        <div className="flex justify-between border-b border-border-gray p-[23px]">
            <div className="flex items-center">
                <Button 
                    icon="pi pi-arrow-left text-primary-maingray" 
                    className="w-[24px] h-[24px] p-0 m-0" 
                    onClick={handleBackToInbox} 
                    text 
                    severity="secondary" 
                />
                <div>
                    <span className="text-primary-blue flex p-0 ml-[14px] font-normal tracking-[-0.035em]">
                        {inbox?.name}
                    </span>
                    {
                        inbox?.inboxGroup == "group" &&
                        <span className="text-primary-maingray text-[12px] flex p-0 ml-[14px] font-normal tracking-[-0.035em]">
                            {inbox?.users?.length} participans
                        </span>
                    }
                </div>
            </div>
            <Button 
                icon="pi pi-times text-primary-maingray" 
                className='w-[24px] h-[24px] p-0 m-0' 
                text 
                severity="secondary" 
                onClick={handleCloseMessege}
            />
        </div>
    )
}

export default ChatHeader;