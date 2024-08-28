"use client"

import { DataScroller } from 'primereact/datascroller';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { QuickTabsAction } from '@/redux/action/quick-tab-action';
import { ChatInboxService } from '@/service/ChatInboxService';
import { UserService } from '@/service/UserService';
import { IUser } from '@/types/user';
import { IChatMessage } from '@/types/chat';
import styled from 'styled-components';
import AppCard from '@/component/card/card';
import moment from 'moment';
import MessageBody from './message-body';
import MessageHeader from './message-header';
import MessageInput from './message-input';
import { RootState } from '@/redux/root';
import { ReplyMessageAction } from '@/redux/action/input-message-action';

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

function AppChatContainer() {
    const [message, setMessage] = useState<IChatMessage | any>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [newMessage, setNewMessage] = useState<any>({});
    const [inputValue, setInputValue] = useState<string>("");
    const dispatch = useDispatch();
    const { tab } = useSelector((state: RootState) => state.QuickTabsReducer);
    const replyMessage: IChatMessage = useSelector((state: RootState) => state.ReplyMessageReducer);

    const handleBackToInbox = () => {
        dispatch(QuickTabsAction({name: "Inbox", group: "Inbox"}));  
    }

    const handleCloseMessage = () => {
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
            const messages: IChatMessage[] = msgByInbox.message.map((i: IChatMessage) => {
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
                    repliedMessage: msgByInbox.message.find((m: IChatMessage) => m.messageId == i.repliedMsgId),
                    divider
                }
            })

            setMessage(messages)
        })
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <AppCard className="rounded-border-rad w-chat-width h-chat-height overflow-hidden">
            <InboxStyle 
                onScrollCapture={handleScroll}
                value={message} 
                itemTemplate={(e) => <MessageBody data={e}/>} 
                rows={5} 
                header={<MessageHeader handleBackToInbox={handleBackToInbox} handleCloseMessage={handleCloseMessage}/>} 
                footer={
                    <MessageInput 
                        input={{
                            value: inputValue,
                            placeholder: "Type a new message", 
                            onChange: (e) => {
                                setInputValue(e.target.value)
                                setNewMessage((prev: IChatMessage) => ({
                                ...prev, message: e.target.value,
                            }))}
                        }}
                        button={{
                            onClick: (e) => {
                                setMessage([...message, {
                                    ...newMessage,
                                    sendDate: moment(new Date()).format("YYYY-MM-DD HH:MM"),
                                    userId: "user000",
                                    owner: true,
                                    repliedMessage: replyMessage ? message.find((m: IChatMessage) => m.messageId == replyMessage?.messageId) : "",
                                }])

                                console.log(moment(new Date()).format("YYYY-MM-DD HH:MM"))
                                setInputValue("")
                                dispatch(ReplyMessageAction(null))
                            }
                        }}
                        loading={loading}
                    />
                }
                inline
                scrollHeight="580px"

                className="w-chat-width h-chat-height font-lato"
                pt={{
                    list: {
                        className: `border-none h-full ${loading && "mb-1"}`,
                    },
                    content: {
                        className: "h-card-height"
                    },
                    header: {
                        className: "bg-transparent p-0 h-[70px] mb-[10px]"
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