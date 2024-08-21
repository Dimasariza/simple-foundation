"use client"

import { Button, ButtonProps } from "primereact/button";
import styled from "styled-components";
import { motion, MotionProps } from "framer-motion"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { QuickTabsAction } from "../../redux/action/tabMenu";
import Image from "next/image";

const MainButton = styled(Button)`
    width: 68px !important;
    height: 68px !important;
`
const OtherButton = styled(Button)`
    width: 60px !important;
    height: 60px !important;
`

const BackButton = styled(motion(MainButton))<ButtonProps | MotionProps>`
    background: #4F4F4F;
`

const FrontButton = styled(motion(MainButton))<ButtonProps | MotionProps>`
    right: 40px;
`

const ButtonWithLabel = styled.div`
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
        // { name: "Other", icon: "close.svg" },
        { name: "Task", group: "Task", icon: "book-active.svg" },
        { name: "Inbox", group: "Inbox", icon: "chat-active.svg" },
    ];

    const dispatch = useDispatch();
    const { tab } = useSelector((state: any) => state.QuickTabsReducer);

    const handleClickTabs = (activeTab: any) => {
        dispatch(QuickTabsAction(activeTab));
    };

    const handleCloseTabs = () => {
        dispatch(QuickTabsAction({name: "close"}));  
        setExpandQuickTab(false);
    };

    useEffect(() => {
        if(!expandQuickTab) {
            dispatch(QuickTabsAction({name: "close"}));  
        }
    }, []);

    return (
        <div className="!fixed bottom-1 right-4 flex items-center">
            <div className="m-5 flex gap-6">
                {
                    expandQuickTab &&
                    <div className="gap-6 flex">
                        {
                            quickTabsBtn
                            .filter(({group}) => group != tab?.group)
                            .map((i: any, key: number) => 
                                <ButtonWithLabel key={i.name + key}>
                                    <p>{!tab && i.name}</p>
                                    <OtherButton 
                                        onClick={() => handleClickTabs(i)} 
                                        className="bg-white" 
                                        rounded 
                                        text 
                                        icon={<Image alt="quick button" src={`/icons/${i.icon}`}
                                    />} />
                                </ButtonWithLabel>
                            )
                        }
                    </div>
                }

                {
                    !tab &&
                    <MainButton 
                        severity="info"
                        onClick={() => {setExpandQuickTab((prev) => !prev)}}
                        icon={<Image alt="Main button" src="/icons/cloud-lightning.svg" />} 
                        rounded
                    />
                }
            </div>

            {   
                tab &&
                <div>
                    <BackButton 
                        {...props}
                        label="B"
                        rounded
                        // initial={{ opacity: 0 }}            
                        // animate={{ opacity: 1 }}
                        // transition={{
                        //     duration: 0.25,
                        //     delay: 1
                        // }}
                        onClick={handleCloseTabs}
                        />
                    <FrontButton 
                        {...props} 
                        rounded
                        className="bg-white" 
                        icon={<Image alt="front button" src={`/icons/${quickTabsBtn.find(i => i.group == tab.group)?.icon}`} />}
                        text 
                    />
                </div>
            }
        </div>
    )
}


export default AppQuickButton;