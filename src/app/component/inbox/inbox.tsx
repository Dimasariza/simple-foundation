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
    .p-list-box {
        max-height: '680px'
    }
        
    .p-listbox-header {
        background: none;
        border: none;
    }

    .p-listbox-list {
        li > div {
            display: grid;
            grid-template-columns: 60px 1fr;
            border-bottom: 1px solid #828282;
            height: 104.5px;
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
            <div onClick={() => handleSelectedInbox(inbox)}>   
                <AppAvatarGroup inbox={inbox} avatar={{image}} />
                <div className="w-full">
                    <div className="flex flex-column gap-2 xl:mr-8">
                        <span className="font-bold" style={{color: "#2F80ED"}}>{inbox.name}</span>
                        <div className="flex align-items-center gap-2">
                            {/* <span>{inbox.category}</span> */}
                        </div>
                    </div>
                    {
                        inbox?.inboxGroup == "group" &&
                        <span><b>Cameron Phillips:</b></span>
                    }
                    <div className="flex justify-between">
                        <span>Hey, please read.</span>
                        {
                            inbox?.unReadMessege &&
                            <i  className="pi pi-circle-fill" 
                                style={{fontSize: "10px", color: "#EB5757", display: "flex", alignItems: "end", paddingBottom: "5px"}}
                                >
                            </i>
                        }
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
                ?   <div className="text-center" style={{height: "737px", alignContent: "center"}}>
                        <div className="flex justify-center">
                            <Image width={100} height={100} alt="loading" src={url + "/icons/loading.svg"} className="pi-spin align-center" />
                        </div>
                        <span>Loading Chats...</span>
                    </div>
                :   <ListStyle 
                        className="w-full md:w-14rem border-none liststyle" 
                        itemTemplate={itemTemplate} 
                        filter
                        filterValue={filter} 
                        onFilterValueChange={() => {}}
                        filterTemplate={<AppSearchBar onChange={handleFilterChange} placeholder="Search" />} 
                        options={inbox} 
                        optionLabel="name"
                    />
            }
        </AppCard>
    )

}

export default AppInbox;