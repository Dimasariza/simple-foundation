"use client"

import { Button, ButtonProps } from "primereact/button";
import styled from "styled-components";
import { AnimatePresence, motion, MotionProps } from "framer-motion"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { QuickTabsAction } from "../../redux/action/tabMenu";
import Image from "next/image";
const url = process.env.PUBLIC_URL || ""

const MainButton = styled(Button)`
    width: 68px !important;
    height: 68px !important;
    box-sizing: border-box;
    border: none;
`
const OtherButton = styled(Button)`
    width: 60px !important;
    height: 60px !important;
`

const BackButton = styled(motion(MainButton))<ButtonProps | MotionProps>`
    background: #4F4F4F;
    right:  15px;
`
    
const FrontButton = styled(motion(MainButton))<ButtonProps | MotionProps>`
    margin-left: 31px;
`

const ButtonWithLabel = motion(styled.div`
    position: relative;

    p {
        position: absolute;
        bottom: 65px;
        width: 100%;
        text-align: center;
        margin-right: 3px;
    }
`)

const AppQuickButton = (props: ButtonProps | MotionProps) => {
    const [expandQuickTab, setExpandQuickTab] = useState<boolean>(false);
    const quickTabsBtn = [
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

    const defaultState = {
        opacity: 0,
        scale: 0.3,
        x: 80
    };

    return (
        <div className="!fixed bottom-quick-btn-bottom right-quick-btn-right flex items-center justify-end">
            <div className="flex items-center gap-quick-btn-gap">
                <AnimatePresence>
                    {
                        expandQuickTab &&
                        <div className="gap-quick-btn-gap flex">
                            {
                                quickTabsBtn
                                .filter(({group}) => group != tab?.group)
                                .map((i: any, key: number) => 
                                    <ButtonWithLabel 
                                        initial={{...defaultState}}
                                        exit={{...defaultState}}
                                        animate={{
                                            opacity: 1,
                                            scale: 1,
                                            x: 0
                                        }}
                                        key={i.name + key}
                                    >
                                        <p className="text-quick-btn-white">{!tab && i.name}</p>
                                        <OtherButton 
                                            onClick={() => handleClickTabs(i)} 
                                            className="bg-quick-btn-white" 
                                            rounded 
                                            text 
                                            icon={<Image width={26.67} height={26.67} alt="quick button" src={url + `/icons/${i.icon}`}
                                        />} />
                                    </ButtonWithLabel>
                                )
                            }
                        </div>
                    }
                </AnimatePresence>

                <AnimatePresence>
                    {
                        !tab &&
                        <MainButton 
                            className="bg-primary-blue"
                            onClick={() => {setExpandQuickTab((prev) => !prev)}}
                            icon={<Image width={56} height={56} alt="Main button" src={url + "/icons/cloud-lightning.svg"} />} 
                            rounded
                        />
                    }
                </AnimatePresence>
            </div>

            {   
                tab &&
                <div>
                    <BackButton 
                        {...props}
                        label="B"
                        rounded
                        className="absolute"
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
                        icon={<Image width={30.22} height={30.22} alt="front button" src={url + `/icons/${quickTabsBtn.find(i => i.group == tab.group)?.icon}`} />}
                        text 
                    />
                </div>
            }
        </div>
    )
}


export default AppQuickButton;