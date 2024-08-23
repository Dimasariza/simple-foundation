import { Button } from "primereact/button";

function ChatHeader({handleBackToInbox, handleCloseMessege}:  any) {
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
                <span className="text-primary-blue flex p-0 ml-[14px] font-normal tracking-[-0.035em]">FastVisa Support</span>
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