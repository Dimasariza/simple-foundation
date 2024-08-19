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

    useEffect(() => {
        ProductService.getProducts().then((data) => {
            setProducts(data)
            setLoading(false)
        });
    }, [])

    const itemTemplate = (item: Product) => {
        return (
            <ItemStyled>
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

    return (
        <Card style={{
            width: "734px",
            height: "737px",
            border: "1px solid #bdbdbd",
            borderRadius: "5px"
        }}
        unstyled>
            {
                loading 
                ?   <div className="text-center" style={{height: "737px", alignContent: "center"}}>
                        <div className="flex justify-center">
                            <img src="/icons/loading.svg" className="pi-spin align-center" />
                        </div>
                        <span>Loading Chats...</span>
                    </div>
                :   <ListBox 
                        pt={{
                            header: {
                                style: {
                                    background: "none",
                                    border: "none"
                                }
                            },
                        }}
                        className="w-full md:w-14rem border-none" 
                        listStyle={{ maxHeight: '500px' }} 
                        itemTemplate={itemTemplate} 
                        filter 
                        filterTemplate={<AppSearchBar placeholder="Search" />} 
                        options={products} 
                        optionLabel="name"
                    />
            }
        </Card>
    )

}

export default AppInbox;