import { Menu } from "primereact/menu";
import { MenuItemCommandEvent } from "primereact/menuitem";
import { IMenuItems, ITaskItemProps, ITaskList } from "@/types/task-list";
import { useRef, useState } from "react";
import { Checkbox, CheckboxChangeEvent } from "primereact/checkbox";
import { Button } from "primereact/button";
import { classNames } from "primereact/utils";
import AppInput from "@/component/input/input";
import moment from "moment";
import Image from "next/image";
import { TaskListService } from "@/service/TaskListService";
const url = process.env.PUBLIC_URL || "";

function TaskItemHeader({options, data, setTaskListData, collapsed, setCollapsed, setSubmit} : ITaskItemProps) {
    const [edit, setEdit] = useState<boolean>(false);
    const menuLeft = useRef<Menu | any>(null);
    const items: IMenuItems.IMenu[] = [
        {
            label: 'Delete',
            labelClass: "text-indicator-tomato",
            command: (e: MenuItemCommandEvent) => {
                TaskListService.deleteTaskList(data.id)
                .then((res) => {
                    setSubmit((prev: boolean) => !prev)
                })
                // setTaskListData((prev: ITaskList[]) => prev.filter((i) => i.id !== data.id))
            },
            
        },
    ];

    const handleEditData = (key: string, newData: any) => {
        setTaskListData((prev: ITaskList[]) => prev.map((i) => {
            if(data?.id == i.id) {
                return {...i, [key]: newData}
            }
            return i
        }))
    }

    const getDateStatus = (date: string) => {
        const currentDateObj: Date = new Date();
        const setDateObj: Date = new Date(date);
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
    
    const { day, diff }: any = getDateStatus(data?.setDate) || {};
    return (
        <div className={`${options?.className} border-none bg-transparent items-center ml-2 mr-6 mt-[5px]`}>
            <div className="flex py-4">
                <Checkbox 
                    pt={{
                        box: {
                            className: "rounded-border-rad h-[18px] w-[18px] self-center border-primary-gray2", 
                        }
                    }} 
                    checked={data?.completed} 
                    onChange={(e: CheckboxChangeEvent) => handleEditData("completed", e.checked)} 
                />
                {
                    edit
                    ?   <AppInput 
                            autoFocus
                            onBlur={() => setEdit(false)}
                            value={data?.taskTitle} 
                            itemRef="ref"
                            placeholder="Type Task Title" 
                            className="ml-4 w-[350px]" 
                            onChange={(e) => handleEditData("taskTitle", e.target.value)}
                        />
                    :   <span data-testid="task-title" className={classNames("cursor-pointer tracking-[-0.03em] items-center ml-4 w-[350px] font-medium", {
                                    "line-through text-14": data?.completed
                                })
                            }
                            onClick={() => setEdit(true)}
                        >
                            {data?.taskTitle}
                        </span>
                }
            </div>
            <div className="flex">
                {
                    data?.setDate &&
                    <div className="flex gap-5 justify-end px-4">
                        <span className="text-indicator-tomato text-14 tracking-[-0.07em]">
                            {diff == 0 ? "" : diff} {day}
                        </span>
                        <span className="text-14 tracking-[0.01em]">
                            {moment(data?.setDate).format("DD-MM-YYYY")}
                        </span>
                    </div>
                }
                <div className="flex gap-3 justify-between">
                    <Button 
                        className="w-[16px] h-[16px]" 
                        text 
                        onClick={() => setCollapsed((prev: boolean) => !prev)} 
                        icon={<i className={classNames("pi text-14 text-primary-gray1", {
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
                            label: (item: IMenuItems.IMenuPT) => ({
                                className: item!?.context?.item?.labelClass
                            })
                        }}  
                    />
                </div>
            </div>
        </div>
    );
}

export default TaskItemHeader;