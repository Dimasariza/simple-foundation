"use client"

import AppSearchBar from "../../component/search-bar/search-bar";
import { useEffect, useState } from "react";
import AppAvatarGroup from "../../component/avatar/avatar-group";
import { ListBox } from "primereact/listbox";
import AppCard from "../../component/card/card";
import { useDispatch } from "react-redux";
import { QuickTabsAction } from "../../redux/action/tabMenu";
import Image from "next/image";
import { IInbox } from "../../types/inbox";
import styled from "styled-components";
import { InboxService } from "../../service/InboxService";
import { ChatInboxService } from "../../service/ChatInboxService";
import { IChatMessage } from "../../types/chat";
import { UserService } from "../../service/UserService";
import { IUser } from "../../types/user";
import moment from "moment";
const url = process.env.PUBLIC_URL || ""

const ListStyle = styled(ListBox)<{data: IInbox[]}>`
    font-family: var(--font-lato);

    .p-list-box {
        max-height: '680px';
    }
        
    .p-listbox-header {
        background: none;
        border: none;
        padding: 24px 32px 0 32px;
    }

    .p-listbox-list {
        padding: 0;
        height: 500px;

        li {
            padding: ${({data}) => data?.length ? "0" : "34px"};
        }
        
        li:last-child > div > div {
            border: none;
        }
    }
`

function AppInbox() {
    const [inbox, setInbox] = useState<IInbox[] | any>();
    const [loading, setLoading] = useState<boolean>(true);
    const [filter, setFilter] = useState<string>("");
    const dispatch = useDispatch();

    const itemTemplate = (inbox: IInbox) => {
        const image = url + "/icons/person-2.svg";
        return (
            <div className="px-[34px]">
                <div onClick={() => handleSelectedInbox(inbox)} className="flex gap-[17px] border-b-[1px] pb-[16px] pt-[22px] border-primary-gray2"> 
                    <div className="w-[50px]">
                        <AppAvatarGroup inbox={inbox} avatar={{image}} />
                    </div>  

                    <div className="w-full mt-[-6px]">
                        <div className="flex flex-column xl:mr-8">
                            <span className="font-bold text-primary-blue max-w-md">
                                {inbox.name}
                            </span>
                            <span className="ml-3 font-normal tracking-[0.01em] flex text-[0.85em]">
                                {inbox.lastMessage?.sendDate && moment(inbox.lastMessage?.sendDate).format("DD/MM/YYYY HH:mm")}
                            </span>
                        </div>
                        {
                            inbox?.inboxGroup == "group" &&
                            <span className="font-normal tracking-[0.01em] mt-[-3px] flex text-[0.9em]">
                                {inbox.lastMessage?.user?.name} :
                            </span>
                        }
                        <div className="flex justify-between">
                            <p className="font-normal tracking-[0.01em] p-0 mt-[-5px] text-[0.9em] w-3/4 truncate">
                                {inbox?.lastMessage?.message}
                            </p>
                            {
                                inbox.lastMessage?.unReadMessage &&
                                <i  className="pi pi-circle-fill text-indicator-tomato !flex pb-[5px] text-[10px] items-end" ></i>
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const handleSelectedInbox = (inbox: IInbox) => {
        if(inbox.inboxGroup == "personal") {
            dispatch(QuickTabsAction({name: "Personal-Inbox", group: "Inbox", inbox}));  
        } else if(inbox.inboxGroup == "group") {
        dispatch(QuickTabsAction({name: "Group-Inbox", group: "Inbox", inbox}));  
        }
    }

    const handleFilterChange = (e: any) => {
        setFilter(e.target.value)
    }

    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 1000);

        Promise.all([
            InboxService.getInbox(),
            UserService.getUsers(),
            ChatInboxService.getMessages(),
        ])
        .then(([inbox, user, messages]) => {
            inbox = inbox.map(i => {
                let { message } = messages?.find((personal) => personal.inboxId == i.id) || {}
                message = message?.map((item: IChatMessage) => ({...item, user: user?.find((u: IUser) => u.userId == item.userId) }))
                
                return {
                    ...i,
                    message,
                    lastMessage: message?.[message?.length - 1]
                }
            })
            setInbox(inbox)
        })
    }, [])

    return (
        <AppCard className="overflow-vissible">
            {
                loading 
                ?   <div className="text-center justify-center overflow-hidden h-card-height py-[20px] px-[34px] rounded-border-rad content-start">
                        <AppSearchBar disabled onChange={handleFilterChange} placeholder="Search"/>
                        <div className="h-full">
                            <div className="flex justify-center mt-[16rem]">
                                <Image width={85} height={85} alt="loading" src={url + "/icons/loading.svg"} className="pi-spin items-center" />
                            </div>
                            <div className="pl-[16px] text-[16px] tracking-[0.01em] mt-1"><b>Loading Chats ...</b></div>
                        </div>
                    </div>
                :   <ListStyle 
                        data={inbox}
                        className="w-full md:w-14rem border-none" 
                        itemTemplate={itemTemplate} 
                        filter
                        filterValue={filter} 
                        onFilterValueChange={() => {}}
                        filterTemplate={<AppSearchBar onChange={handleFilterChange} placeholder="Search"/>} 
                        options={inbox} 
                        optionLabel="name"
                    />
            }
        </AppCard>
    )

}

export default AppInbox;