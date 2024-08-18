"use client"

import { Card } from "primereact/card";
import AppSearchBar from "../search-bar/search-bar";
import { useEffect, useState } from "react";
import { OrderList } from "primereact/orderlist";
import AppAvatarGroup from "../avatar/avatar-group";
import styled from "styled-components";

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
    &::after {
        content: "";
        width: 100%;
        height: 1px;
        background: #828282;

    }
`


function AppInbox() {
    const [products, setProducts] = useState<Product[] | any>();
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        setProducts([
            {
                id: '1000',
                code: 'f230fh0g3',
                name: 'Bamboo Watch',
                description: 'Product Description',
                image: 'bamboo-watch.jpg',
                price: 65,
                category: 'Accessories',
                quantity: 24,
                inventoryStatus: 'INSTOCK',
                rating: 5
            }
        ])
    }, [])

    const itemTemplate = (item: Product) => {
        return (
            <ItemStyled className="flex flex-wrap p-2 align-items-center gap-3">
                <AppAvatarGroup />
                <div className="flex-1 flex flex-column gap-2 xl:mr-8">
                    <span className="font-bold">{item.name}</span>
                    <div className="flex align-items-center gap-2">
                        <span>{item.category}</span>
                    </div>
                </div>
                <span className="font-bold text-900">${item.price}</span>
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
                ?   <div className="text-center bg-blue-400" style={{height: "737px"}}>
                        <div className="flex justify-center">
                            <img src="/icons/loading.svg" className="pi-spin align-center" />
                        </div>
                        <span>Loading Chats...</span>
                    </div>
                :   <OrderList 
                        dataKey="id" 
                        value={products} 
                        onChange={(e) => setProducts(e.value)} itemTemplate={itemTemplate} 
                        filter filterBy="name" 
                        filterTemplate={<AppSearchBar placeholder="Search" />} 
                        pt={{
                            filterContainer: {
                                style: {
                                    border: "none",
                                    borderRadius: "10px"
                                }
                            },
                            list: {
                                style: {
                                    border: "none"
                                }
                            },
                            controls: {
                                style: {
                                    display: "none"
                                }
                            },
                    }}>
                    </OrderList>
            }
        </Card>
    )

}

export default AppInbox;