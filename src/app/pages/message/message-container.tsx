"use client"

import { DataScroller } from 'primereact/datascroller';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { QuickTabsAction } from '@/redux/action/quick-tab-action';
import { MessageService } from '@/service/MessageService';
import { UserService } from '@/service/UserService';
import { IUser } from '@/types/user';
import { IChatMessage, IMsgByInbox } from '@/types/message';
import styled from 'styled-components';
import AppCard from '@/component/card/card';
import moment from 'moment';
import MessageBody from './message-body';
import MessageHeader from './message-header';
import MessageInput from './message-input';
import { RootState } from '@/redux/root';
import { ReplyMessageAction } from '@/redux/action/input-message-action';
import { isSameDay } from 'date-fns';

const InboxStyle = styled(DataScroller)`
    .p-datascroller-list > li {
        border: none;
    }

    .p-datascroller .p-datascroller-footer {
        padding: 0;
    }
`

function AppChatContainer() {
    const [message, setMessage] = useState<IChatMessage[]>([]);
    const [allMessages, setAllMessages] = useState<IChatMessage[]>();
    const [loading, setLoading] = useState<boolean>(true);
    const [inputValue, setInputValue] = useState<string>("");
    const [submit, setSubmit] = useState<boolean>(false);
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
            id: allMessages ? Number(allMessages!.at(-1)?.id) + 1 : 1,
            sendDate: moment(new Date()).format("YYYY-MM-DD HH:MM"),
            userId: 0,
            unReadMessage: false,
            repliedMsgId: replyMessage ? message?.find((m: IChatMessage) => m.id == replyMessage?.id)!.id : "",
            inboxId: tab.inbox.id,
        } as IChatMessage

        MessageService.addMessage(newMessage)
        .then(res => {  
            setSubmit((prev) => !prev)
        })
        setInputValue("")
        dispatch(ReplyMessageAction(null))
    }

    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 2000);

        Promise.all([
            MessageService.getMessages(),
            MessageService.getMsgByInbox(tab?.inbox?.id),
            UserService.getUsers()
        ])
        .then(([allMessages, msgByInbox, user]: [IChatMessage[], IChatMessage[], IUser[]]) => {
            let divider = "";
            let lastSendDate = "";
            const messages: IChatMessage[] | any = msgByInbox?.map((i: IChatMessage) => {
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
                    repliedMessage: msgByInbox.find((m: IChatMessage) => m.id == i.repliedMsgId),
                    divider
                }
            })
            setAllMessages(allMessages)
            setMessage(messages)
        })
    }, [submit]); // eslint-disable-line react-hooks/exhaustive-deps

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