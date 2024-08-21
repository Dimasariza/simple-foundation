import { Dispatch, useRef, useState } from "react";
import { ITaskList } from "../../types/task-list";
import { MenuItem } from "primereact/menuitem";
import { Menu } from "primereact/menu";
import { Checkbox, CheckboxChangeEvent } from "primereact/checkbox";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import AppDatePicker from "../date-picker/date-picker";
import { InputTextarea } from "primereact/inputtextarea";
import { Panel } from "primereact/panel";
import { IEditTaskItem, ITaskItemProps } from "../../types/task-item";
import Image from "next/image";

function TaskItem ({data, setTaskListData}: ITaskItemProps) {
    const [edit, setEdit] = useState<IEditTaskItem>({
        taskTitle: false,
        taskDescription: false
    });

    const menuLeft = useRef<Menu | any>(null);
    const items: MenuItem[] = [
        {
            label: 'Delete',
        },
    ];

    const handleEdit = (name: string) => {
        setEdit((prev) => ({...prev, [name]: !prev[name]}))
    }

    const handleCompletedTask = (e: CheckboxChangeEvent) => {
        setTaskListData((prev: ITaskList[]) => prev.map((i) => {
            if(data.id == i.id) {
                return {...i, completed: e.checked}
            }
            return i
        }))
    }

    const getDateStatus = () => {
        const currentDateObj: Date = new Date();
        const setDateObj: Date = new Date(data?.setDate);
        const differenceInMilliseconds = setDateObj.getTime() - currentDateObj.getTime();
        const differenceInDays = differenceInMilliseconds / (1000 * 60 * 60 * 24);

        if(differenceInDays > -1 && differenceInDays < 0) {
            return { day: "Today", diff: 0 }
        } else if (differenceInDays > 0) {
            return { day: "Days Left", diff: Math.ceil(Math.abs(differenceInDays)) } 
        } else if(differenceInDays < -1) {
            return { day: "Days Over", diff: Math.floor(Math.abs(differenceInDays)) }
        }
    }

    const panelHeaderTemplate = (options: any) => {
        const className = `${options.className} justify-content-space-between border-none bg-transparent`;
        const { day, diff }: any = getDateStatus();

        return (
            <div className={className}>
                <div className="flex align-items-center gap-2">
                    <Checkbox checked={data?.completed} onChange={handleCompletedTask} />
                    {
                        edit.taskTitle
                        ? <InputText />
                        : <span className={`cursor-pointer ${data.completed && "line-through"}`} onClick={() => handleEdit("taskTitle")}>{data?.title}</span>
                    }
                </div>
                <div>
                    <span className="text-red-400">{diff == 0 ? "" : diff} {day}</span>
                    <span>{data?.setDate}</span>
                </div>
                <div>
                    {options.togglerElement}
                    <Button  text icon={<Image alt="menu" src='/icons/menu-deactive.svg'/>} onClick={(event) => menuLeft.current.toggle(event)} aria-controls="popup_menu_left" aria-haspopup />
                    <Menu model={items} popup ref={menuLeft} />
                </div>
            </div>
        );
    };

    const panelBodyTemplate = (
        <>
            <div className="flex align-self-center">
                <i className="pi pi-clock"></i>
                <AppDatePicker value={new Date(data?.setDate)} />
            </div>
            <div className="flex">
                <i className="pi pi-pencil"></i>
                {
                    edit.taskDescription 
                    ? <InputTextarea autoResize/>
                    : <span className="cursor-pointer" onClick={() => handleEdit("taskDescription")}>{data?.description}</span>
                }
            </div>
        </>
    )

    return (
        <div style={{borderBottom: "1px solid"}}>
            <Panel 
                collapsed={true}
                headerTemplate={panelHeaderTemplate} 
                toggleable 
                pt={{
                    content: {
                        style: {
                            border: "none",
                            borderRadius: 0
                        }
                    }
                }}
            >
                {panelBodyTemplate}
            </Panel>
        </div>
    )
}

export default TaskItem;