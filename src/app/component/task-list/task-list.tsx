import { Accordion, AccordionTab } from "primereact/accordion";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Checkbox } from "primereact/checkbox";
import { Dropdown } from "primereact/dropdown";
import { ReactNode, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import AppDatePicker from "../date-picker/date-picker";
import { Nullable } from "primereact/ts-helpers";
import { MenuItem } from "primereact/menuitem";
import { Menu } from "primereact/menu";
import { Panel } from "primereact/panel";
import { Avatar } from "primereact/avatar";

const Task = styled.div`

`

function AppTaskList() {
    const [selectedCity, setSelectedCity] = useState(null);
    const [checked, setChecked] = useState<any>(false);

    const cities = [
        { name: 'New York', code: 'NY' },
        { name: 'Rome', code: 'RM' },
        { name: 'London', code: 'LDN' },
        { name: 'Istanbul', code: 'IST' },
        { name: 'Paris', code: 'PRS' }
    ];

    const cardHeaderTemplate = () => {
        return (
            <div className="flex w-full justify-between bg-red-500">
                <Dropdown 
                    value={selectedCity} 
                    onChange={(e) => setSelectedCity(e.value)} 
                    options={cities} 
                    optionLabel="name" 
                    placeholder="Select a City" 
                    className="md:w-14rem" 
                />

                <Button label="New Task" />
            </div>
        )
    }

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

    const panelHeaderTemplate = (options: any) => {
        const className = `${options.className} justify-content-space-between`;

        return (
            <div className={className}>
                <div className="flex align-items-center gap-2">
                    <Checkbox onChange={e => setChecked(e.checked)} checked={checked} />
                    <span className="font-bold">Cross Reference with Jeanne for case</span>
                </div>
                <div>
                    <span className="text-red-400">2 Days left</span>
                    <span>01 Aug 2024</span>
                </div>
                <div>
                    {options.togglerElement}
                    <Button  text icon={<img src='/icons/menu-deactive.svg'/>} onClick={(event) => menuLeft.current.toggle(event)} aria-controls="popup_menu_left" aria-haspopup />
                    <Menu model={items} popup ref={menuLeft} />
                </div>
            </div>
        );
    };

    const panelFooterTemplate = (options: any) => {
        const className = `${options.className} flex flex-wrap align-items-center justify-content-between gap-3`;

        return (
            <div className={className}>
                <div className="flex align-items-center gap-2">
                    <Button icon="pi pi-user" rounded text></Button>
                    <Button icon="pi pi-bookmark" severity="secondary" rounded text></Button>
                </div>
                <span className="p-text-secondary">Updated 2 hours ago</span>
            </div>
        );
    };


    return (
        <Card header={cardHeaderTemplate}>
            <Panel headerTemplate={panelHeaderTemplate}  toggleable>
                <div>
                    <i className="pi pi-clock"></i>
                    <AppDatePicker />
                </div>
                <div>
                    <i className="pi pi-pencil"></i>
                    <span>No Description</span>
                </div>
            </Panel>
            <Task />
        </Card>
    )

}

export default AppTaskList;