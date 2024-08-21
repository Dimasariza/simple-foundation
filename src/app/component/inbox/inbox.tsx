"use client"

import { Card } from "primereact/card";
import AppSearchBar from "../search-bar/search-bar";
import { useEffect, useState } from "react";
import { OrderList } from "primereact/orderlist";
import AppAvatarGroup from "../avatar/avatar-group";
import styled from "styled-components";
import "./inbox.scss"
import { ProductService } from "../../service/ProductService";
import { ListBox } from "primereact/listbox";
import AppCard from "../card/card";
import { useDispatch, useSelector } from "react-redux";
import { QuickTabsAction } from "../../redux/action/tabMenu";
import Image from "next/image";
const url = process.env.PUBLIC_URL

interface Product {
    id: string;
    code: string;
    name: string;
    description: string;
    image: string;
    price: number;
    category: string;
    quantity: number;
    inventoryStatus: 'string',
    rating: number;
}

const ItemStyled = styled.div`
    display: grid;
    grid-template-columns: 60px 1fr;
    border-bottom: 1px solid #828282;
    height: 104.5px;
`

function AppInbox() {
    const [products, setProducts] = useState<Product[] | any>();
    const [loading, setLoading] = useState<boolean>(true);
    const dispatch = useDispatch();

    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 1000);
        ProductService.getProducts().then((data) => {
            setProducts(data)
        });
    }, [])

    const itemTemplate = (item: Product) => {
        return (
            <ItemStyled 
                onClick={handleSelectedInbox}
            >
                <AppAvatarGroup />
                <div className="w-full">
                    <div className="flex flex-column gap-2 xl:mr-8">
                        <span className="font-bold" style={{color: "#2F80ED"}}>{item.name}</span>
                        <div className="flex align-items-center gap-2">
                            <span>{item.category}</span>
                        </div>
                    </div>
                    <span>Cameron Phillips:</span>
                    <div className="flex justify-between">
                        <span>Hey, please read.</span>
                        <i  className="pi pi-circle-fill" 
                            style={{fontSize: "10px", color: "#EB5757", display: "flex", alignItems: "end", paddingBottom: "5px"}}
                            >
                        </i>
                    </div>
                </div>
            </ItemStyled>
        );
    };

    const handleSelectedInbox = () => {
        dispatch(QuickTabsAction({name: "Group-Inbox", group: "Inbox"}));  
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
                :   <ListBox 
                        pt={{
                            header: {
                                style: {
                                    background: "none",
                                    border: "none",
                                }
                            },
                        }}
                        className="w-full md:w-14rem border-none" 
                        listStyle={{ maxHeight: '680px' }} 
                        itemTemplate={itemTemplate} 
                        filter 
                        filterTemplate={<AppSearchBar placeholder="Search" />} 
                        options={products} 
                        optionLabel="name"
                    />
            }
        </AppCard>
    )

}

export default AppInbox;