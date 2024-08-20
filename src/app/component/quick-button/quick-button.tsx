import { Button, ButtonProps } from "primereact/button";
import styled from "styled-components";
import { motion, MotionProps } from "framer-motion"
import { useState } from "react";

const MainButton = styled(Button)`
    width: 68px !important;
    height: 68px !important;
`

const BackButton = styled(motion(Button))<ButtonProps | MotionProps>`
    background: #4F4F4F;
`

const FrontButton = styled(motion(Button))<ButtonProps | MotionProps>`
    right: 40px;
`

const OtherButton = styled.div`
    position: relative;

    p {
        position: absolute;
        bottom: 70px;
        width: 100%;
        text-align: center;
    }
`

const AppQuickButton = (props: ButtonProps | MotionProps) => {
    const [expandQuickTab, setExpandQuickTab] = useState<boolean>(false);
    const quickTabsBtn = [
        { name: "Task", icon: "book-active.svg" },
        { name: "Inbox", icon: "chat-active.svg" },
    ]

    return (
        <div className="m-5 flex gap-2">
            {
                expandQuickTab &&
                <div className="gap-2 flex">
                    {
                        quickTabsBtn.map(({name, icon}: any) => 
                            <OtherButton>
                                <p>{name}</p>
                                <MainButton className="bg-white" rounded text icon={<img src={`/icons/${icon}`}/>} />
                            </OtherButton>
                        )
                    }
                </div>
            }

            <MainButton 
                severity="info"
                onClick={() => setExpandQuickTab((prev) => !prev)}
                icon={<img src="/icons/cloud-lightning.svg" />} 
                rounded
            />

            {/* <BackButton 
                {...props}
                label="B"
                rounded
                initial={{ opacity: 0 }}            
                animate={{ opacity: 1 }}
                transition={{
                    duration: 0.25,
                    delay: 1
                }}
            />
            <FrontButton {...props} label="F" rounded/> */}
        </div>
    )
}


export default AppQuickButton;