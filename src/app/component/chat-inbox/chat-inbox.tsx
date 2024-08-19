"use client"

import { DataScroller } from 'primereact/datascroller';
import { ReactElement, ReactNode, useEffect, useRef, useState } from "react";
import { Rating } from "primereact/rating";
import { Button } from "primereact/button";
import { ProductService } from "../../service/ProductService";
import { Card } from "primereact/card";
import styled from 'styled-components';
import { Menu } from 'primereact/menu';
import { MenuItem } from 'primereact/menuitem';
import AppSearchBar from '../search-bar/search-bar';

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
    border-radius: 5px;
    border: 1px solid #BDBDBD;
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

function AppChatInbox() {
    const [products, setProducts] = useState<Product | any>([]);

    useEffect(() => {
        ProductService.getProducts().then((data) => setProducts(data));
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const menuLeft = useRef<Menu | any>(null);
    const items: MenuItem[] = [
        {
            label: 'Refresh',
            icon: 'pi pi-refresh'
        },
        {
            label: 'Export',
            icon: 'pi pi-upload'
        }
    ];

    const itemTemplate = (data: any) => {
        return (
            <div>
                <MassageStyle owner="own">
                    <span>You</span>
                    <div className='msg-wrapper'>
                        <Button  text icon={<img src='/icons/menu-deactive.svg'/>} onClick={(event) => menuLeft.current.toggle(event)} aria-controls="popup_menu_left" aria-haspopup />
                        <Menu model={items} popup ref={menuLeft} />
                        <div>
                            <span>
                                No worries. It will be completed ASAP. I've asked him yesterday.
                            </span>
                            <span>
                                19.32
                            </span>
                        </div>
                    </div>
                </MassageStyle>
                <MassageStyle >
                    <span>You</span>
                    <div className='msg-wrapper'>
                        <Button  text icon={<img src='/icons/menu-deactive.svg'/>} onClick={(event) => menuLeft.current.toggle(event)} aria-controls="popup_menu_left" aria-haspopup />
                        <Menu model={items} popup ref={menuLeft} />
                        <div>
                            <span>
                                No worries. It will be completed ASAP. I've asked him yesterday.
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

    const header = (
        <div className="flex justify-between" style={{borderBottom: "1px solid #BDBDBD"}}>
            <div className="flex">
                <Button icon="pi pi-arrow-left" text severity="secondary" />
                <div className="flex" style={{flexDirection: "column"}}>
                    <span>I-589 - AMARKHIL, Obaidullah [Affirmative Filling with ZHn]</span>
                    <span>3 Participants</span>
                </div>
            </div>
            <Button icon="pi pi-times" text severity="secondary" />
        </div>
    );

    const footer = (
        <div>
            <AppSearchBar />
        </div>
    )

    return (
        <InboxStyle 
            pt={{
                header: {
                    style: {
                        padding: 0,
                        background: "none",
                        borderRadius: "10px"
                    }
                },
                item: {
                    style: {
                        border: "none"
                    }
                },
                footer: {
                    style: {
                        background: "none",
                        border: "none"
                    }
                }
            }} 
            value={products} 
            itemTemplate={itemTemplate} 
            rows={5} 
            header={header} 
            footer={footer}
            inline 
            scrollHeight="620px"
        />
    )
}

export default AppChatInbox;