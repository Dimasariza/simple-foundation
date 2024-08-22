"use client"

import { DataScroller } from 'primereact/datascroller';
import { useEffect, useRef, useState } from "react";
import { Button } from "primereact/button";
import { ProductService } from "../../service/ProductService";
import styled from 'styled-components';
import { Menu } from 'primereact/menu';
import AppCard from '../card/card';
import { useDispatch } from 'react-redux';
import { QuickTabsAction } from '../../redux/action/tabMenu';
import Image from 'next/image';
import { IPersonalMessege } from '../../types/chat';
import AppMessegeInput from './messege-input';
const url = process.env.PUBLIC_URL || ""

const InboxStyle = styled(DataScroller)`
    width: 708px;
    height: 726px;
    
    .p-datascroller-list > li {
        border: none;
    }

    .p-datascroller .p-datascroller-content {
        padding: 0;
    }

    .p-datascroller .p-datascroller-footer {
        padding: 0;
    }
`

const MassageStyle = styled.div<{owner?: string}>`
    text-align: ${({owner}) => owner == "own" ? "end" : "start"};
    margin-bottom: 2px;

    .msg-wrapper {
        display: flex;
        flex-direction: ${({owner}) => owner == "own" ? "row" : "row-reverse"};
        justify-content: ${({owner}) => owner == "own" ? "end" : "start"};

        div {
            text-align: start;
            width: 455px;
            border: none;
            display: flex;
            flex-direction: column;
            background: ${({owner}) => owner == "own" ? "#EEDCFF" : "#F8F8F8"};
            padding: 8px;
            border-radius: 5px;
        }
    }
`

function AppPersonalChatInbox() {
    const [messege, setMessege] = useState<IPersonalMessege | any>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const dispatch = useDispatch();

    const menuLeft = useRef<Menu | any>(null);
    const menuRight = useRef<Menu | any>(null);
    const menuItems = {
        other: [
            {
                label: 'Share',
            },
            {
                label: 'Reply',
            }
        ],
        own: [
            {
                label: 'Edit',
            },
            {
                label: 'Delete',
            }
        ]
    }

    const itemTemplate = (data: any) => {
        return (
            <div className={`pl-[18px]`}>
                <MassageStyle >
                    <span className="text-primary-blue text-[14px] tracking-[-0.04em]">FastVisa Support</span>
                    <div className="msg-wrapper">
                        <Button  
                            className="h-[10px]"
                            text 
                            icon={<Image width={16} height={16} alt='menu' src={url + "/icons/menu-deactive.svg"}/>} 
                            onClick={(event) => menuRight.current.toggle(event)} 
                            aria-controls="popup_menu_left" 
                            aria-haspopup 
                        />
                        <Menu model={menuItems.other} popupAlignment="right" popup ref={menuRight} />
                        <div>
                            <span className="text-[12px] tracking-[0.04em]">
                                Hey there. Welcome to your inbox! Contact us for more information and help about anything! We&apos;ll send you a response as soon as possible.
                            </span>
                            <span className="text-[12px] tracking-[0.04em] flex pt-1">
                                19.32
                            </span>
                        </div>
                    </div>
                </MassageStyle>
                <MassageStyle owner="own">
                    <span className="text-chats-badge-purple text-[14px] tracking-[-0.04em]">You</span>
                    <div className='msg-wrapper'>
                        <Button  
                            className="h-[10px]"
                            text 
                            icon={<Image width={16} height={16} alt='menu' src={url + "/icons/menu-deactive.svg"}/>} 
                            onClick={(event) => menuLeft.current.toggle(event)} 
                            aria-controls="popup_menu_left" 
                            aria-haspopup 
                        />
                        <Menu model={menuItems.own} popup ref={menuLeft} />
                        <div>
                            <span className="text-[12px] tracking-[0.04em]">
                                Hi, I need help with something can you help me?
                            </span>
                            <span className="text-[12px] tracking-[0.04em] flex pt-1">
                                19.32
                            </span>
                        </div>
                    </div>
                </MassageStyle>
            </div>
        );
    };

    const handleBackToInbox = () => {
        dispatch(QuickTabsAction({name: "Inbox", group: "Inbox"}));  
    }

    const header = (
        <div className="flex justify-between border-b border-border-gray p-[23px]">
            <div className="flex items-center">
                <Button icon="pi pi-arrow-left text-primary-maingray" className="w-[24px] h-[24px] p-0 m-0" onClick={handleBackToInbox} text severity="secondary" />
                <span className="text-primary-blue flex p-0 ml-[14px] font-normal tracking-[-0.035em]">FastVisa Support</span>
            </div>
            <Button icon="pi pi-times text-primary-maingray" className='w-[24px] h-[24px] p-0 m-0' text severity="secondary" />
        </div>
    );

    useEffect(() => {
        ProductService.getProducts().then((data) => setMessege(data));
        setTimeout(() => {
            setLoading(false)
        }, 2000);
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <AppCard 
            style={{
                width: "708px",
                height: "726px",
                borderRadius: "5px",
                overflow: "hidden"
            }}
        >
            <InboxStyle 
                value={messege} 
                itemTemplate={itemTemplate} 
                rows={5} 
                header={header} 
                footer={<AppMessegeInput loading={loading}/>}
                inline 
                scrollHeight="580px"
                pt={{
                    list: {
                        className: `border-none h-card-height ${loading && "mb-20"}`,
                    },
                    header: {
                        className: "bg-transparent p-0 h-[70px] mb-[12px]"
                    },
                    footer: {
                        className: "bg-transparent border-none"
                    }
                }}
            />
        </AppCard>
    )
}

export default AppPersonalChatInbox;