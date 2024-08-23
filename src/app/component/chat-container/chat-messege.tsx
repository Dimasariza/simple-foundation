"use client"

import { DataScroller } from 'primereact/datascroller';
import { useEffect, useRef, useState } from "react";
import { Button } from "primereact/button";
import styled from 'styled-components';
import { Menu } from 'primereact/menu';
import AppCard from '../card/card';
import { useDispatch, useSelector } from 'react-redux';
import { QuickTabsAction } from '../../redux/action/tabMenu';
import Image from 'next/image';
import { IChatMessege } from '../../types/chat';
import AppMessegeInput from './messege-input';
import { ChatInboxService } from '../../service/ChatInboxService';
import { UserService } from '../../service/UserService';
import { IUser } from '../../types/user';
import ChatHeader from './messege-header';
import { Divider } from 'primereact/divider';
const url = process.env.PUBLIC_URL || ""

const InboxStyle = styled(DataScroller)`
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

const MassageStyle = styled.div<{owner?: boolean}>`
    text-align: ${({owner}) => owner ? "end" : "start"};
    margin-bottom: 2px;

    .msg-wrapper {
        display: flex;
        flex-direction: ${({owner}) => owner ? "row" : "row-reverse"};
        justify-content: ${({owner}) => owner ? "end" : "start"};

        div {
            text-align: start;
            width: 455px;
            border: none;
            display: flex;
            flex-direction: column;
            background: ${({owner}) => owner ? "#EEDCFF" : "#F8F8F8"};
            padding: 8px;
            border-radius: 5px;
        }
    }
`

function AppChatContainer() {
    const [messege, setMessege] = useState<IChatMessege | any>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const dispatch = useDispatch();
    const { tab } = useSelector((state: any) => state.QuickTabsReducer);

    const menuLeft = useRef<Menu | any>(null);
    const menuRight = useRef<Menu | any>(null);
    const menuItems = {
        other: [
            {
                label: 'Share',
                color: "text-primary-blue"
            },
            {
                label: 'Reply',
                color: "text-primary-blue"
            }
        ],
        own: [
            {
                label: 'Edit',
                color: "text-primary-blue"
            },
            {
                label: 'Delete',
                color: "text-indicator-tomato"
            }
        ]
    }

    const itemTemplate = (data: any) => {
        console.log(data)
        const {owner} = data || {};
        return (
            <div className={`pl-[18px]`}>
                <MassageStyle owner={owner}>
                    <span className={`${owner ? "text-chats-badge-purple" : "text-primary-blue"} text-[14px] tracking-[-0.04em]`}>{owner ? "You" :  data?.user?.name}</span>
                    <div className="msg-wrapper">
                        <Button  
                            className="h-[10px] w-[20px]"
                            text 
                            icon={<Image width={16} height={16} alt='menu' src={url + "/icons/menu-deactive.svg"}/>} 
                            onClick={(event) => owner ? menuLeft.current.toggle(event) : menuRight.current.toggle(event)} 
                            aria-haspopup  
                        />
                        <Menu className="w-[125px] ml-[2px] mt-[-4px] p-0 shadow-none border border-border-gray border border-solid" 
                            model={owner ? menuItems.own : menuItems.other} 
                            popupAlignment={owner ? "left" : "right"} 
                            popup 
                            ref={owner ? menuLeft : menuRight}  
                            pt={{
                                label(options: any) {
                                    return {
                                        ...options,
                                        className: options?.context.item?.color
                                    }
                                },
                            }} 
                        />
                        <div>
                            <span className="text-[12px] tracking-[0.04em]">
                                {data?.messege}
                            </span>
                            <span className="text-[12px] tracking-[0.04em] flex pt-1">
                                19.32
                            </span>
                        </div>
                    </div>
                </MassageStyle>
                {
                    tab?.inbox?.inboxGroup == "group" &&
                    <Divider align="center" className="m-0 mt-5 text-l text-indicator-tomato border-indicator-tomato">
                        <span>Today June 09, 2021</span>
                    </Divider>
                }
            </div>
        );
    };

    const handleBackToInbox = () => {
        dispatch(QuickTabsAction({name: "Inbox", group: "Inbox"}));  
    }

    const handleCloseMessege = () => {
        dispatch(QuickTabsAction({name: "close"}));  
    }

    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 2000);

        Promise.all([
            ChatInboxService.getMsgByInbox(tab?.inbox?.id),
            UserService.getUsers()
        ])
        .then(([msgByInbox, user]: any) => {
            const messeges = msgByInbox.messege.map((i: IChatMessege) => {
                return {
                    ...i,
                    user: user.find((u: IUser) => u.userId == i.userId),
                    owner: i.userId == "user000"
                }
            })
            setMessege(messeges)
        })
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <AppCard className="rounded-[5px] w-chat-width h-chat-height overflow-hidden">
            <InboxStyle 
                value={messege} 
                itemTemplate={itemTemplate} 
                rows={5} 
                header={<ChatHeader handleBackToInbox={handleBackToInbox}  handleCloseMessege={handleCloseMessege} />} 
                footer={<AppMessegeInput loading={loading}/>}
                inline 
                scrollHeight="580px"
                className="w-chat-width h-chat-height"
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

export default AppChatContainer;