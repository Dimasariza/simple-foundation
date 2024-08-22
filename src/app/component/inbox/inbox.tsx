"use client"

import AppSearchBar from "../search-bar/search-bar";
import { useEffect, useState } from "react";
import AppAvatarGroup from "../avatar/avatar-group";
import { ProductService } from "../../service/ProductService";
import { ListBox } from "primereact/listbox";
import AppCard from "../card/card";
import { useDispatch } from "react-redux";
import { QuickTabsAction } from "../../redux/action/tabMenu";
import Image from "next/image";
import { IInbox } from "../../types/inbox";
import styled from "styled-components";
const url = process.env.PUBLIC_URL || ""

const ListStyle = styled(ListBox)`
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
            padding: 0;
        }
        
        li:last-child > div {
            border: none;
        }
    }

`

function AppInbox() {
    const [inbox, setInbox] = useState<IInbox[] | any>();
    const [loading, setLoading] = useState<boolean>(true);
    const [filter, setFilter] = useState<string>("");
    const dispatch = useDispatch();

    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 500);
        ProductService.getProducts().then((data) => {
            setInbox(data)
        });
    }, [])

    const itemTemplate = (inbox: IInbox) => {
        const image = url + "/icons/person-2.svg";
        return (
            <div className="px-[34px]">
                <div onClick={() => handleSelectedInbox(inbox)} className="flex gap-[17px] border-b-[1px] pb-[16px] pt-[22px] border-primary-gray2">   
                    <AppAvatarGroup inbox={inbox} avatar={{image}} />

                    <div className="w-full mt-[-6px]">
                        <div className="flex flex-column xl:mr-8">
                            <span className="font-bold text-primary-blue max-w-4/5">
                                {inbox.name}
                            </span>
                            <span className="ml-3 font-normal tracking-[0.01em] flex text-[0.85em]">January 1, 2021 19.10</span>
                        </div>
                        {
                            inbox?.inboxGroup == "group" &&
                            <span className="font-normal tracking-[0.01em] mt-[-3px] flex text-[0.9em]">Cameron Phillips:</span>
                        }
                        <div className="flex justify-between">
                            <span className="font-normal tracking-[0.01em] p-0 mt-[-5px] flex text-[0.9em]">Please check this out!</span>
                            {
                                true &&
                                <i  className="pi pi-circle-fill" 
                                    style={{fontSize: "10px", color: "#EB5757", display: "flex", alignItems: "end", paddingBottom: "5px"}}
                                    >
                                </i>
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const handleSelectedInbox = (inbox: IInbox) => {
        if(inbox.inboxGroup == "personal") {
            dispatch(QuickTabsAction({name: "Personal-Inbox", group: "Inbox"}));  
        } else if(inbox.inboxGroup == "group") {
            dispatch(QuickTabsAction({name: "Group-Inbox", group: "Inbox"}));  
        }
    }

    const handleFilterChange = (e: any) => {
        setFilter(e.target.value)
    }

    return (
        <AppCard style={{overflow: "visible"}}>
            {
                loading 
                ?   <div className="text-center justify-center overflow-hidden h-card-height py-[20px] px-[34px] rounded-md content-start">
                        <AppSearchBar disabled onChange={handleFilterChange} placeholder="Search"/>
                        <div className="h-full">
                            <div className="flex justify-center mt-[16rem]">
                                <Image width={85} height={85} alt="loading" src={url + "/icons/loading.svg"} className="pi-spin items-center" />
                            </div>
                            <div className="pl-[16px] text-[16px] tracking-[0.01em] mt-1"><b>Loading Chats ...</b></div>
                        </div>
                    </div>
                :   <ListStyle 
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