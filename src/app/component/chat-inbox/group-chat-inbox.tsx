"use client"

import { DataScroller } from 'primereact/datascroller';
import { useEffect, useRef, useState } from "react";
import { Button } from "primereact/button";
import { ProductService } from "../../service/ProductService";
import styled from 'styled-components';
import { Menu } from 'primereact/menu';
import AppSearchBar from '../search-bar/search-bar';
import AppCard from '../card/card';
import { useDispatch } from 'react-redux';
import { QuickTabsAction } from '../../redux/action/tabMenu';
import Image from 'next/image';
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
    inventoryStatus: string;
    rating: number;
}

interface Massage {
    owner?: string;
}

const InboxStyle = styled(DataScroller)`
    width: 708px;
    height: 726px;

    .p-datascroller-list > li {
        border: none;
    }
`

const MassageStyle = styled.div<Massage>`
    padding: 10px;
    max-height: 100px;
    text-align: ${({owner}) => owner == "own" ? "end" : "start"};

    .msg-wrapper {
        display: flex;
        flex-direction: ${({owner}) => owner == "own" ? "row" : "row-reverse"};
        justify-content: ${({owner}) => owner == "own" ? "end" : "start"};

        div {
            text-align: start;
            display: flex;
            flex-direction: column;
            background: red;
            padding: 9px;
            border-radius: 5px;
        }
    }
`

function AppGroupChatInbox() {
    const [products, setProducts] = useState<Product | any>([]);
    const dispatch = useDispatch();

    useEffect(() => {
        ProductService.getProducts().then((data) => setProducts(data));
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const menuLeft = useRef<Menu | any>(null);
    const menuRight = useRef<Menu | any>(null);
    const menuItems = {
        other: [
            {
                label: 'Share',
            },
            {
                label: 'Reply',
            }
        ],
        own: [
            {
                label: 'Edit',
            },
            {
                label: 'Delete',
            }
        ]
    }

    const itemTemplate = (data: any) => {
        return (
            <div>
                <MassageStyle owner="own">
                    <span>You</span>
                    <div className='msg-wrapper' style={{border: "none"}}>
                        <Button  
                            text 
                            icon={<Image width={100} height={100} alt='menu' src={url + "/icons/menu-deactive.svg"}/>} 
                            onClick={(event) => menuLeft.current.toggle(event)} 
                            aria-controls="popup_menu_left" 
                            aria-haspopup 
                        />
                        <Menu model={menuItems.own} popup ref={menuLeft} />
                        <div>
                            <span>
                                No worries. It will be completed ASAP. I&apos;ve asked him yesterday.
                            </span>
                            <span>
                                19.32
                            </span>
                        </div>
                    </div>
                </MassageStyle>
                <MassageStyle >
                    <span>Other</span>
                    <div className='msg-wrapper'>
                        <Button  
                            text 
                            icon={<Image width={100} height={100} alt='menu' src={url + "/icons/menu-deactive.svg"}/>} 
                            onClick={(event) => menuRight.current.toggle(event)} 
                            aria-controls="popup_menu_left" 
                            aria-haspopup 
                        />
                        <Menu model={menuItems.other} popup ref={menuRight} />
                        <div>
                            <span>
                                No worries. It will be completed ASAP. I&apos;ve asked him yesterday.
                            </span>
                            <span>
                                19.32
                            </span>
                        </div>
                    </div>
                </MassageStyle>
            </div>
        );
    };

    const handleBackToInbox = () => {
        dispatch(QuickTabsAction({name: "Inbox", group: "Inbox"}));  
    }

    const header = (
        <div className="flex justify-between" style={{borderBottom: "1px solid #BDBDBD"}}>
            <div className="flex">
                <Button icon="pi pi-arrow-left" onClick={handleBackToInbox} text severity="secondary" />
                <div className="flex text-start" style={{flexDirection: "column"}}>
                    <span>I-589 - AMARKHIL, Obaidullah [Affirmative Filling with ZHn]</span>
                    <span>3 Participants</span>
                </div>
            </div>
            <Button icon="pi pi-times" text severity="secondary" />
        </div>
    );

    const footer = (
        <div>
            <div style={{
                position: "relative"
            }}>
                <span style={{position: "absolute", bottom: "10px"}}>test</span>
            </div>
            <AppSearchBar />
        </div>
    )

    return (
        <AppCard 
            style={{
                width: "708px",
                height: "726px",
                borderRadius: "5px",
                overflow: "hidden"
            }}
        >
            <InboxStyle 
                value={products} 
                itemTemplate={itemTemplate} 
                rows={5} 
                header={header} 
                footer={footer}
                inline 
                scrollHeight="610px"
                pt={{
                    list: {
                        style: {
                            border: "none !important",
                        }
                    }
                }}
            />
        </AppCard>
    )
}

export default AppGroupChatInbox;