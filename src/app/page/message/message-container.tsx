"use client"

import { DataScroller } from 'primereact/datascroller';
import { useEffect, useState } from "react";
import styled from 'styled-components';
import AppCard from '../../component/card/card';
import { useDispatch, useSelector } from 'react-redux';
import { QuickTabsAction } from '../../redux/action/tabMenu';
import { ChatInboxService } from '../../service/ChatInboxService';
import { UserService } from '../../service/UserService';
import { IUser } from '../../types/user';
import moment from 'moment';
import MessageBody from './message-body';
import { IChatMessage } from '../../types/chat';
import MessageHeader from './message-header';
import MessageInput from './message-input';

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

function AppChatContainer() {
    const [message, setMessege] = useState<IChatMessage | any>([]);
    const [loading, setLoading] = useState<boolean>(true);
    // const [divider, setDivider] = useState<string>("");
    const [newMessage, setNewMessage] = useState<any>({});
    const dispatch = useDispatch();
    const { tab } = useSelector((state: any) => state.QuickTabsReducer);

    const handleBackToInbox = () => {
        dispatch(QuickTabsAction({name: "Inbox", group: "Inbox"}));  
    }

    const handleCloseMessege = () => {
        dispatch(QuickTabsAction({name: "close"}));  
    }

    const handleScroll = () => {
    }

    const isSameDay = (date1: string, date2: string) => {
        const d1 = new Date(date1);
        const d2 = new Date(date2);
    
        return d1.getFullYear() === d2.getFullYear() &&
               d1.getMonth() === d2.getMonth() &&
               d1.getDate() === d2.getDate();
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
            let divider = "";
            let lastSendDate = "";
            const messeges = msgByInbox.message.map((i: IChatMessage) => {
                if(i.unReadMessage) {
                    divider = "unReadMessage"
                } else if(!isSameDay(lastSendDate, i.sendDate)) {
                    lastSendDate = i.sendDate
                    divider = i.sendDate
                } else {
                    divider = ""
                }
                return {
                    ...i,
                    user: user.find((u: IUser) => u.userId == i.userId),
                    owner: i.userId == "user000",
                    divider
                }
            })
            setMessege(messeges)
        })
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <AppCard className="rounded-border-rad w-chat-width h-chat-height overflow-hidden">
            <InboxStyle 
                onScrollCapture={handleScroll}
                value={message} 
                itemTemplate={(e) => <MessageBody data={e}/>} 
                rows={5} 
                header={<MessageHeader handleBackToInbox={handleBackToInbox} handleCloseMessege={handleCloseMessege}/>} 
                footer={
                    <MessageInput 
                        input={{
                            placeholder: "Type a new message", 
                            onChange: (e) => {
                                setNewMessage((prev: IChatMessage) => ({
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
                    },
                }}
            />
        </AppCard>
    )
}

export default AppChatContainer;