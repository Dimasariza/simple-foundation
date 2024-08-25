import Image from "next/image";
import { Button } from "primereact/button";
import { Divider } from "primereact/divider";
import { Menu } from "primereact/menu";
import { classNames } from "primereact/utils";
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { IChatMessage } from "../../types/chat";
import moment from "moment";
const url = process.env.PUBLIC_URL || ""

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

function MessageBody ({data}: {data: IChatMessage}) {
    const {owner, unReadMessage, user, message, divider, sendDate} = data || {};

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

    const { tab } = useSelector((state: any) => state.QuickTabsReducer);

    const scrollToBottomRef = useRef<any>();
    const scrollToBottom = () => {
        scrollToBottomRef.current.scrollIntoView({  })
    }
    
    useEffect(() => {
        scrollToBottom()
    }, []);

    return (
        <div className="pl-[18px]" ref={scrollToBottomRef}>
            {
                tab?.inbox?.inboxGroup == "group" &&
                divider &&
                <Divider 
                    align="center" 
                    className={classNames("m-0 mt-5 text-l font-lato font-bold", {
                        "text-indicator-tomato before:border-indicator-tomato": unReadMessage,
                        "text-primary-gray1 before:border-primary-gray1": !unReadMessage
                    })}
                >
                    <span>
                        {
                            unReadMessage 
                            ? "New Message"
                            : `${moment(new Date(sendDate)).isSame(new Date, 'day') ? "Today" : ""} ${moment(new Date(sendDate)).format("MMM DD,   yyyy")}`
                        }
                    </span>
                </Divider>
            }
            <MassageStyle owner={owner}>
                <span 
                    className={classNames("text-[14px] tracking-[0.01em]", {
                        "text-chats-badge-purple": owner,
                        "text-primary-blue": !owner && tab?.inbox?.inboxGroup == "personal",
                        "text-chats-badge-yellow": !owner && tab?.inbox?.inboxGroup == "group" && !unReadMessage,
                        "text-chats-badge-green": unReadMessage,
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
                        "bg-chats-main-yellow": !owner && tab?.inbox?.inboxGroup == "group" && !unReadMessage,
                        "bg-chats-main-green": !owner && unReadMessage,
                    })}>
                        <span className="text-[12px] tracking-[0.07em]">
                            {message}
                        </span>
                        <span className="text-[12px] tracking-[0.04em] flex pt-1">
                            {moment(sendDate).format("HH:mm")}
                        </span>
                    </div>
                </div>
            </MassageStyle>
        </div>
    );
};

export default MessageBody;