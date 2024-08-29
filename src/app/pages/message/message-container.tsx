"use client"

import { DataScroller } from 'primereact/datascroller';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { QuickTabsAction } from '@/redux/action/quick-tab-action';
import { ChatInboxService } from '@/service/MessageService';
import { UserService } from '@/service/UserService';
import { IUser } from '@/types/user';
import { IChatMessage, IMgsByInbox } from '@/types/message';
import styled from 'styled-components';
import AppCard from '@/component/card/card';
import moment from 'moment';
import MessageBody from './message-body';
import MessageHeader from './message-header';
import MessageInput from './message-input';
import { RootState } from '@/redux/root';
import { ReplyMessageAction } from '@/redux/action/input-message-action';
import { IInbox } from '@/types/inbox';

const InboxStyle = styled(DataScroller)`
    .p-datascroller-list > li {
        border: none;
    }

    .p-datascroller .p-datascroller-footer {
        padding: 0;
    }
`

function AppChatContainer() {
    const [message, setMessage] = useState<IChatMessage | any>([]);
    const [inbox, setInbox] = useState<IMgsByInbox>();
    const [loading, setLoading] = useState<boolean>(true);
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

    const handleOnChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value)
    }

    const handleOnClickButton = () => {
        const newMessage = {
            deleted: false,
            message: inputValue,
            messageId: message.at(-1).messageId++,
            sendDate: moment(new Date()).format("YYYY-MM-DD HH:MM"),
            userId: 0,
            unReadMessage: false
        } as IChatMessage

        console.log(newMessage)

        // setMessage([...message, {
        //     message: inputValue,
        //     owner: true,
        //     repliedMessage: replyMessage ? message.find((m: IChatMessage) => m.messageId == replyMessage?.messageId) : "",
        // }])
        setInputValue("")
        dispatch(ReplyMessageAction(null))
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
        .then(([msgByInbox, user]: [IMgsByInbox, IUser[]]) => {
            let divider = "";
            let lastSendDate = "";
            setInbox(msgByInbox);
            const messages: IChatMessage[] | any = msgByInbox?.message?.map((i: IChatMessage) => {
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
                    user: user.find((u: IUser) => u.id == i.userId),
                    owner: i.userId == 0,
                    repliedMessage: msgByInbox.message.find((m: IChatMessage) => m.messageId == i.repliedMsgId),
                    divider
                }
            })
            setMessage(messages)
        })
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <AppCard className="w-chat-width h-chat-height overflow-hidden">
            <InboxStyle 
                onScrollCapture={handleScroll}
                value={message} 
                itemTemplate={(e) => <MessageBody data={e}/>} 
                rows={10} 
                header={<MessageHeader handleBackToInbox={handleBackToInbox} handleCloseMessage={handleCloseMessage}/>} 
                footer={
                    <MessageInput 
                        input={{
                            value: inputValue,
                            placeholder: "Type a new message", 
                            onChange: handleOnChangeInput
                        }}
                        button={{
                            onClick: handleOnClickButton
                        }}
                        loading={loading}
                    />
                }
                inline
                scrollHeight="595px"
                className="font-lato"
                pt={{
                    list: {
                        className: `border-none`,
                    },
                    content: {
                        className: `p-3 pl-7 pb-8 h-card-height ${loading && "pb-20"}`
                    },
                    header: {
                        className: "bg-transparent pb-0 border-b border-border-gray border-solid m-0"
                    },
                    footer: {
                        className: "bg-transparent border-none p-0"
                    },
                }}
            />
        </AppCard>
    )
}

export default AppChatContainer;