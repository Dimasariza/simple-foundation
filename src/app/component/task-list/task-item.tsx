import { useRef, useState } from "react";
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
import moment from "moment";
const url = process.env.PUBLIC_URL || ""

function TaskItem ({data, setTaskListData}: ITaskItemProps) {
    const [edit, setEdit] = useState<IEditTaskItem>({
        taskTitle: false,
        taskDescription: false
    });
    const [collapsed, setCollapsed] = useState<boolean>(true);

    const menuLeft = useRef<Menu | any>(null);
    const items: MenuItem[] = [
        {
            label: 'Delete',
        },
    ];

    const handleEditing = (name: string) => {
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

    const handleEditSetDate = (e: any) => {
        setTaskListData((prev: ITaskList[]) => prev.map((i) => {
            if(data.id == i.id) {
                return {...i, setDate: moment(e?.value).format("YYYY-MM-DD")  }
            }
            return i
        }))
    }

    const handleEditDescription = () => {

    }

    const handleEditTitle = () => {

    }

    const getDateStatus = () => {
        const currentDateObj: Date = new Date();
        const setDateObj: Date = new Date(data?.setDate);
        const differenceInMilliseconds = setDateObj.getTime() - currentDateObj.getTime();
        const differenceInDays = differenceInMilliseconds / (1000 * 60 * 60 * 24);

        if(Math.sign(differenceInDays) < 0 && Math.abs(differenceInDays) < 1) {
            return { day: "Today", diff: 0 }
        } else if (Math.sign(differenceInDays) > 0 && differenceInDays > 0) {
            return { day: "Days Left", diff: Math.ceil(Math.abs(differenceInDays)) } 
        } else if(Math.sign(differenceInDays) < 0 && differenceInDays < 1) {
            return { day: "Days Over", diff: Math.floor(Math.abs(differenceInDays)) }
        }
    }

    const panelHeaderTemplate = (options: any) => {
        const className = `${options.className} justify-content-space-between border-none bg-transparent`;
        const { day, diff }: any = getDateStatus() || {};

        return (
            <div className={className}>
                <div className="flex align-items-center gap-2">
                    <Checkbox checked={data?.completed} onChange={handleCompletedTask} />
                    {
                        edit.taskTitle
                        ? <InputText />
                        : <span className={`cursor-pointer ${data.completed && "line-through"}`} onClick={() => handleEditing("taskTitle")}>{data?.title}</span>
                    }
                </div>
                {
                    data?.setDate &&
                    <div>
                        <span className="text-red-400">{diff == 0 ? "" : diff} {day}</span>
                        <span>{moment(data?.setDate).format("DD-MM-YYYY")}</span>
                    </div>
                }
                <div>
                    {
                        collapsed
                        ? <Button text onClick={() => setCollapsed(prev => !prev)} icon={<i className="pi pi-angle-down"></i>}></Button> 
                        : <Button text onClick={() => setCollapsed(prev => !prev)} icon={<i className="pi pi-angle-up"></i>}></Button> 
                    }
                    <Button  text icon={<Image width={100} height={100} alt="menu" src={url + "/icons/menu-deactive.svg"} />} onClick={(event) => menuLeft.current.toggle(event)} aria-controls="popup_menu_left" aria-haspopup />
                    <Menu model={items} popup ref={menuLeft} />
                </div>
            </div>
        );
    };

    const panelBodyTemplate = (
        <>
            <div className="flex align-self-center">
                <Image alt="clock" src={`/icons/clock-${data?.setDate ? "active" : "deactive"}.svg`} width={50} height={50} />
                <AppDatePicker dateFormat="dd-mm-yy" value={new Date(data?.setDate)} onChange={handleEditSetDate} />
            </div>
            <div className="flex">
                <Image width={100} height={100} alt="Edit task list" src={"/icons/pencil.svg"} />
                {
                    edit.taskDescription 
                    ? <InputTextarea className="w-full" autoResize/>
                    : <span className="cursor-pointer" onClick={() => handleEditing("taskDescription")}>{data?.description}</span>
                }
            </div>
        </>
    )

    return (
        <div>
            <Panel 
                collapsed={collapsed}
                onToggle={() => setCollapsed(prev => !prev)}
                headerTemplate={panelHeaderTemplate} 
                toggleable 
                pt={{
                    content: {
                        style: {
                            // border: "none",
                            borderRadius: 0
                        }
                    },
                }}
            >
                {panelBodyTemplate}
            </Panel>
        </div>
    )
}

export default TaskItem;