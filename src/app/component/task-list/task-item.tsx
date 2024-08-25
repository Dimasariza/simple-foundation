import { useRef, useState } from "react";
import { IEditTaskItem, ITaskItemProps, ITaskList } from "../../types/task-list";
import { MenuItem, MenuItemCommandEvent } from "primereact/menuitem";
import { Menu } from "primereact/menu";
import { Checkbox, CheckboxChangeEvent } from "primereact/checkbox";
import { Button } from "primereact/button";
import AppDatePicker from "../date-picker/date-picker";
import { Panel } from "primereact/panel";
import Image from "next/image";
import moment from "moment";
import { classNames } from "primereact/utils";
import styled from "styled-components";
import AppTextArea from "../text-area/text-area";
import AppInput from "../input/input";
const url = process.env.PUBLIC_URL || "";

const StyledPanel = styled(Panel)`
    font-family: var(--font-lato);

    .p-panel-header {
        padding: 0;
    }

    .p-panel-content {
        padding: 0;
        border: 0;
    }
`;

function TaskItem ({data, setTaskListData, taskListData}: ITaskItemProps) {
    const [edit, setEdit] = useState<IEditTaskItem>({
        taskTitle: false,
        taskDescription: false
    });
    const [collapsed, setCollapsed] = useState<boolean>(true);

    const menuLeft = useRef<Menu | any>(null);
    const items: MenuItem[] = [
        {
            label: 'Delete',
            command: (e: MenuItemCommandEvent) => {
                setTaskListData((prev: ITaskList[]) => prev.filter((i) => i.id !== data.id))
            },
            
        },
    ];

    const handleEditing = (name: string) => {
        setEdit((prev) => ({...prev, [name]: !prev[name]}))
    }

    const handleEditData = (key: string, newData: any) => {
        setTaskListData((prev: ITaskList[]) => prev.map((i) => {
            if(data?.id == i.id) {
                return {...i, [key]: newData}
            }
            return i
        }))
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
        const { day, diff }: any = getDateStatus() || {};
        return (
            <div className={`${options.className} border-x-0 border-t-0 border-b-1 bg-transparent items-center ml-[20px] mr-[40px] my-[5px]`}>
                <div className="flex p-[10px]">
                    <Checkbox 
                        pt={{
                            box: {
                                className: "rounded-[2px] border-primary-gray2 border-2 h-[18px] w-[18px] self-center", 
                            }
                        }} 
                        checked={data?.completed} 
                        onChange={(e: CheckboxChangeEvent) => handleEditData("completed", e.checked)} 
                    />
                    {
                        edit.taskTitle
                        ?   
                        <AppInput 
                                value={data?.taskTitle} 
                                itemRef="ref"
                                placeholder="Type Task Title" 
                                className="ml-4 w-[350px]" 
                                onChange={(e) => handleEditData("taskTitle", e.target.value)}
                            />
                        :   <span className={classNames("cursor-pointer tracking-[-0.03em] items-center ml-4 w-[350px] font-medium", {
                                        "line-through text-[14px]": data?.completed
                                    })
                                }
                                onClick={() => handleEditing("taskTitle")}
                            >
                                {data?.taskTitle}
                            </span>
                    }
                </div>
                <div className="flex">
                    {
                        data?.setDate &&
                        <div className="flex gap-5 justify-end px-4">
                            <span className="text-indicator-tomato text-[14px] tracking-[-0.07em]">
                                {diff == 0 ? "" : diff} {day}
                            </span>
                            <span className="text-[14px] tracking-[0.01em]">
                                {moment(data?.setDate).format("DD-MM-YYYY")}
                            </span>
                        </div>
                    }
                    <div className="flex gap-3 justify-between">
                        <Button 
                            className="w-[16px] h-[16px]" 
                            text 
                            onClick={() => setCollapsed(prev => !prev)} 
                            icon={<i className={classNames("pi text-[14px] text-primary-gray1", {
                                "pi-angle-down": collapsed,
                                "pi pi-angle-up": !collapsed
                            })}></i>}
                        /> 
                        <Button 
                            className="w-[24px] h-[24px]" 
                            text 
                            icon={<Image width={20} height={20} alt="menu" src={url + "/icons/menu-deactive.svg"} />} 
                            onClick={(event) => menuLeft.current.toggle(event)} 
                            aria-controls="popup_menu_left" 
                            aria-haspopup 
                        />
                        <Menu 
                            model={items} 
                            popup 
                            ref={menuLeft} 
                            className="w-[125px] ml-[2px] mt-[-4px] p-0 shadow-none border border-border-gray border border-solid" 
                            pt={{
                                label: {
                                    className: "text-indicator-tomato"
                                }
                            }}
                        />
                    </div>
                </div>
            </div>
        );
    };

    const panelBodyTemplate = (
        <div className="mx-16 grid-cols-12 grid">
            <div className="flex">
                <Image alt="clock" src={`/icons/clock-${data?.setDate ? "active" : "deactive"}.svg`} width={20} height={20} />
            </div>
            <AppDatePicker 
                className="col-span-11" 
                dateFormat="dd-mm-yy" 
                value={new Date(data?.setDate)} 
                onChange={(e) => handleEditData("setDate", moment(e?.value).format("YYYY-MM-DD"))} 
            />
            <div className="flex">
                <Image width={15} height={15} alt="Edit task list" src={`/icons/pencil-${data?.description ? "active" : "deactive"}.svg`} />
            </div>
            <div className="col-span-11 my-5">
                {
                    edit.taskDescription 
                    ? <AppTextArea className="w-full" value={data?.description} autoResize onChange={(e) => handleEditData("description", e.target.value)}/>
                    : <p className="cursor-pointer tracking-[-0.04em] min-h-5 min-w-[600px] leading-5" onClick={() => handleEditing("taskDescription")}>
                        {data?.description}
                      </p>
                }
            </div>
        </div>
    )

    return (
        <StyledPanel 
            className="p-0 border-none"
            collapsed={collapsed}
            onToggle={() => setCollapsed(prev => !prev)}
            headerTemplate={panelHeaderTemplate} 
            toggleable 
        >
            {panelBodyTemplate}
        </StyledPanel>
    )
}

export default TaskItem;