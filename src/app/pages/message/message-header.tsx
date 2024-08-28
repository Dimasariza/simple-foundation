import { RootState } from "@/redux/root";
import { Button } from "primereact/button";
import { useSelector } from "react-redux";

function MessageHeader({handleBackToInbox, handleCloseMessage}:  any) {
    const { tab } = useSelector((state: RootState) => state.QuickTabsReducer) || {};

    return (
        <div className="flex justify-between pt-[6px] pl-[13px] pr-[4px] pb-[18px] items-center">
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
                        {tab?.inbox?.name}
                    </span>
                    {
                        tab?.inbox?.inboxGroup == "group" &&
                        <span className="text-primary-maingray text-12 flex p-0 ml-[14px] font-normal tracking-[-0.035em]">
                            {tab?.inbox?.users?.length} participans
                        </span>
                    }
                </div>
            </div>
            <Button 
                icon="pi pi-times text-primary-maingray" 
                className='w-[24px] h-[24px] p-0 m-0' 
                text 
                severity="secondary" 
                onClick={handleCloseMessage}
            />
        </div>
    )
}

export default MessageHeader;