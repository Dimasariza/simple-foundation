"use client"

import { DataScroller } from 'primereact/datascroller';
import { useEffect, useRef, useState } from "react";
import { Button } from "primereact/button";
import { ProductService } from "../../service/ProductService";
import styled from 'styled-components';
import { Menu } from 'primereact/menu';
import AppSearchBar from '../search-bar/search-bar';
import AppCard from '../card/card';
import { useDispatch } from 'react-redux';
import { QuickTabsAction } from '../../redux/action/tabMenu';
import Image from 'next/image';
import "./chat.scss"
import { IPersonalMessege } from '../../types/chat';
const url = process.env.PUBLIC_URL || ""

const InboxStyle = styled(DataScroller)`
    width: 708px;
    height: 726px;

    .p-datascroller-list > li {
        border: none;
    }
`

const MassageStyle = styled.div<{owner?: string}>`
    padding: 10px;
    max-height: 100px;
    text-align: ${({owner}) => owner == "own" ? "end" : "start"};

    .msg-wrapper {
        display: flex;
        flex-direction: ${({owner}) => owner == "own" ? "row" : "row-reverse"};
        justify-content: ${({owner}) => owner == "own" ? "end" : "start"};

        div {
            text-align: start;
            display: flex;
            flex-direction: column;
            background: ${({owner}) => owner == "own" ? "#EEDCFF" : "#F8F8F8"};
            padding: 9px;
            border-radius: 5px;
        }
    }
`

function AppPersonalChatInbox() {
    const [messege, setMessege] = useState<IPersonalMessege | any>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const dispatch = useDispatch();

    useEffect(() => {
        ProductService.getProducts().then((data) => setMessege(data));
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

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
            <div className={`${loading && "mb-20"} mb-2`}>
                <MassageStyle owner="own">
                    <span>You</span>
                    <div className='msg-wrapper'>
                        <Button  
                            text 
                            icon={<Image width={100} height={100} alt='menu' src={url + "/icons/menu-deactive.svg"}/>} 
                            onClick={(event) => menuLeft.current.toggle(event)} 
                            aria-controls="popup_menu_left" 
                            aria-haspopup 
                        />
                        <Menu model={menuItems.own} popup ref={menuLeft} />
                        <div>
                            <span>
                                No worries. It will be completed ASAP. I&apos;ve asked him yesterday.
                            </span>
                            <span>
                                19.32
                            </span>
                        </div>
                    </div>
                </MassageStyle>
                <MassageStyle >
                    <span>Other</span>
                    <div className='msg-wrapper'>
                        <Button  
                            text 
                            icon={<Image width={100} height={100} alt='menu' src={url + "/icons/menu-deactive.svg"}/>} 
                            onClick={(event) => menuRight.current.toggle(event)} 
                            aria-controls="popup_menu_left" 
                            aria-haspopup 
                        />
                        <Menu model={menuItems.other} popup ref={menuRight} />
                        <div>
                            <span>
                                No worries. It will be completed ASAP. I&apos;ve asked him yesterday.
                            </span>
                            <span>
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
        <div className="flex justify-between" style={{borderBottom: "1px solid #BDBDBD"}}>
            <div className="flex items-center">
                <Button icon="pi pi-arrow-left" onClick={handleBackToInbox} text severity="secondary" />
                <span className='bg-chats-badge-yellow text-test'>FastVisa Support</span>
            </div>
            <Button icon="pi pi-times" text severity="secondary" />
        </div>
    );

    const footer = (
        <div className='relative'>
            {
                loading && 
                <span className="absolute left-0 w-full" style={{bottom: "50px"}}>
                    <div className="messege-badge flex">
                        <Image src={url + "/icons/pc-loading.svg"} className='pi-spin' width={34} height={34} alt="loading" />
                        <span style={{marginLeft: "11px"}}>Please wait while we connect you with one of our team ...</span>
                    </div>
                </span>
            }
            <AppSearchBar />
        </div>
    )

    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 2000);
    }, [])

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
                footer={footer}
                inline 
                scrollHeight="610px"
                pt={{
                    list: {
                        style: {
                            border: "none !important",
                        }
                    }
                }}
            />
        </AppCard>
    )
}

export default AppPersonalChatInbox;