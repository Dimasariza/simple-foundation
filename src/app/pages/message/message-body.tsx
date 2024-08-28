"use client";

import { Button } from "primereact/button";
import { Divider } from "primereact/divider";
import { Menu } from "primereact/menu";
import { classNames } from "primereact/utils";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MenuItem } from "primereact/menuitem";
import { IChatMessage } from "../../types/message";
import moment from "moment";
import Image from "next/image";
import { ReplyMessageAction } from "@/redux/action/input-message-action";
import { RootState } from "@/redux/root";
const url = process.env.PUBLIC_URL || ""

function MessageBody ({data}: {data: IChatMessage}) {
    const {owner, unReadMessage, user, message, divider, sendDate, repliedMessage} = data || {};
    
    const { tab } = useSelector((state: RootState) => state.QuickTabsReducer);
    const scrollToBottomRef = useRef<any>();
    const dispatch = useDispatch();

    const menuLeft = useRef<Menu | any>(null);
    const menuRight = useRef<Menu | any>(null);
    const menuItems: any = {
        other: [
            {
                label: 'Share',
                color: "text-primary-blue"
            },
            {
                label: 'Reply',
                color: "text-primary-blue",
                command: () => {
                    dispatch(ReplyMessageAction(data))
                }
            }
        ],
        own: [
            {
                label: 'Edit',
                color: "text-primary-blue",
            },
            {
                label: 'Delete',
                color: "text-indicator-tomato",
                command: () => {
                }
            }
        ]
    } as { other: MenuItem, own: MenuItem }

    const scrollToBottom = () => {
        scrollToBottomRef.current.scrollIntoView({  })
    }
    
    useEffect(() => {
        scrollToBottom()
    }, []);

    return (
        <div className="p-0" ref={scrollToBottomRef}>
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
            <div className={classNames("mb-[2px]",{
                "text-end": owner
            })}>
                <span 
                    className={classNames("text-14 tracking-[0.01em]", {
                        "text-chats-badge-purple": owner,
                        "text-primary-blue": !owner && tab?.inbox?.inboxGroup == "personal",
                        "text-chats-badge-yellow": !owner && tab?.inbox?.inboxGroup == "group" && !unReadMessage,
                        "text-chats-badge-green": unReadMessage,
                    })} 
                >
                    {owner ? "You" :  user?.name}
                </span>
                {
                    owner && repliedMessage &&
                    <div className="w-full my-1 flex justify-end">
                        <div className="w-4/5 bg-primary-white p-2 text-14 rounded-border-rad border border-primary-gray2 text-start">
                            {repliedMessage.message}
                        </div>
                    </div>
                }
                <div className={classNames("flex justify-end .msg-wrapper", {
                    "flex-row": owner,
                    "flex-row-reverse": !owner
                })}>
                    <Button  
                        className="h-[10px] w-[20px]"
                        text 
                        icon={<Image width={16} height={16} alt='menu' src={url + "/icons/menu-deactive.svg"}/>} 
                        onClick={(event) => owner ? menuLeft.current.toggle(event) : menuRight.current.toggle(event)} 
                        aria-haspopup  
                    />
                    <Menu className="w-[125px] ml-[2px] mt-[-4px] p-0 shadow-none border border-border-gray border-solid rounded-border-rad" 
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
                    <div className={classNames("p-2 rounded-border-rad max-w-[80%] min-w-[50%] text-start flex flex-col",{
                        "bg-chats-main-purple": owner,
                        "bg-quick-btn-white": !owner && tab?.inbox?.inboxGroup == "personal",
                        "bg-chats-main-yellow": !owner && tab?.inbox?.inboxGroup == "group" && !unReadMessage,
                        "bg-chats-main-green": !owner && unReadMessage,
                    })}>
                        <span className="text-12 px-1 tracking-[0.07em]">
                            {message}
                        </span>
                        <span className="text-12 tracking-[0.04em] px-1 flex pt-1">
                            {moment(sendDate).format("HH:mm")}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MessageBody;