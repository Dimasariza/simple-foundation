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
import { ChatInboxService } from '../../service/ChatInboxService';
import { UserService } from '../../service/UserService';
import { IUser } from '../../types/user';
import { Divider } from 'primereact/divider';
import { classNames } from 'primereact/utils';
import ChatHeader from './message-header';
import AppMessegeInput from './message-input';
import moment from 'moment';
const url = process.env.PUBLIC_URL || ""

const InboxStyle = styled(DataScroller)`
    font-family: var(--font-lato);

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
            padding: 8px;
            border-radius: 5px;
        }
    }
`

function AppChatContainer() {
    const emptyMessage = {
        deleted: "",
        message: "",
        messegeId: "",
        inboxId: "",
        sendDate: "",
        user: "",
        userId: "",
        unReadMessege: "",
        owner: ""
    };

    const [message, setMessege] = useState<IChatMessege | any>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [newMessage, setNewMessage] = useState<any>(emptyMessage);
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
        const {owner, unReadMessege, user, message} = data || {};
        return (
            <div className={`pl-[18px]`}>
                {
                    tab?.inbox?.inboxGroup == "group" &&
                    <Divider 
                        align="center" 
                        className={classNames("m-0 mt-5 text-l font-lato font-bold", {
                            "text-indicator-tomato before:border-indicator-tomato": unReadMessege,
                            "text-primary-gray1 before:border-primary-gray1": !unReadMessege
                        })}
                    >
                        <span>
                            {
                                unReadMessege 
                                ? "New Message"
                                : "Today June 09, 2021"
                            }
                        </span>
                    </Divider>
                }
                <MassageStyle owner={owner}>
                    <span 
                        className={classNames("text-[14px] tracking-[0.01em]", {
                            "text-chats-badge-purple": owner,
                            "text-primary-blue": !owner && tab?.inbox?.inboxGroup == "personal",
                            "text-chats-badge-yellow": !owner && tab?.inbox?.inboxGroup == "group" && !unReadMessege,
                            "text-chats-badge-green": unReadMessege
                        })} 
                    >
                        {owner ? "You" :  user?.name}
                    </span>
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
                        <div className={classNames({
                            "bg-chats-main-purple": owner,
                            "bg-quick-btn-white": !owner && tab?.inbox?.inboxGroup == "personal",
                            "bg-chats-main-yellow": !owner && tab?.inbox?.inboxGroup == "group" && !unReadMessege,
                            "bg-chats-main-green": !owner && unReadMessege,
                        })}>
                            <span className="text-[12px] tracking-[0.07em]">
                                {message}
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
            const messeges = msgByInbox.message.map((i: IChatMessege) => {
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
                value={message} 
                itemTemplate={itemTemplate} 
                rows={5} 
                header={<ChatHeader handleBackToInbox={handleBackToInbox} handleCloseMessege={handleCloseMessege} />} 
                footer={
                    <AppMessegeInput 
                        input={{
                            placeholder: "Type a new message", 
                            onChange: (e) => {
                                console.log(newMessage)
                                setNewMessage((prev: IChatMessege) => ({
                                ...prev, message: e.target.value,
                            }))}
                        }}
                        button={{
                            onClick: (e) => {
                                setMessege([...message, {
                                    ...newMessage,
                                    sendData: moment(new Date()).format("YYYY-MM-DD"),
                                    userId: "user000",
                                    owner: true
                                }])
                            }
                        }}
                        loading={loading}
                    />
                }
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