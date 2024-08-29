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
import { differenceInDays } from "date-fns";
const url = process.env.PUBLIC_URL || "";

function TaskItemHeader({options, data, collapsed, setCollapsed, setSubmit} : ITaskItemProps) {
    const [edit, setEdit] = useState<boolean>(false);
    const [value, setValue] = useState<ITaskList>(data);
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
            },
            
        },
    ];

    const handleEditData = (key: string, newData: any) => {
        setValue((prev) => ({...prev, [key]: newData}));
    }
    
    const handleOnSubmit = () => {
        TaskListService.updateTaskList(value)
        .then(res => {
            setSubmit((prev: boolean) => !prev)
        })
    }

    const getDateStatus = (date: string) => {
        const currentDateObj: Date = new Date();
        const setDateObj: Date = new Date(date);
        const diff = differenceInDays(setDateObj, currentDateObj)
        
        if(diff == 0) {
            return { day: "Today", diff }
        } else if(diff > 0) {
            return { day: "Days Left", diff }
        } else if(diff < 0) {
            return { day: "Days Over", diff: Math.abs(diff) }
        }
    }
    
    const { day, diff }: any = getDateStatus(value?.setDate) || {};
    return (
        <div className={`${options?.className} border-none bg-transparent items-center ml-2 mr-6 mt-[5px]`}>
            <div className="flex py-4">
                <Checkbox 
                    pt={{
                        box: {
                            className: "rounded-border-rad h-[18px] w-[18px] self-center border-primary-gray2", 
                        }
                    }} 
                    checked={value?.completed} 
                    onChange={(e: CheckboxChangeEvent) => {
                        handleEditData("completed", e.checked);
                    }} 
                    onBlur={() => {
                        handleOnSubmit();
                    }}
                />
                {
                    edit
                    ?   <AppInput 
                            autoFocus
                            onBlur={() => {
                                setEdit(false);
                                handleOnSubmit();    
                            }}
                            value={value?.taskTitle} 
                            itemRef="ref"
                            placeholder="Type Task Title" 
                            className="ml-4 w-[350px]" 
                            onChange={(e) => handleEditData("taskTitle", e.target.value)}
                        />
                    :   <span data-testid="task-title" className={classNames("cursor-pointer tracking-[-0.03em] items-center ml-4 w-[350px] font-medium", {
                                    "line-through text-14": value?.completed
                                })
                            }
                            onClick={() => setEdit(true)}
                        >
                            {value?.taskTitle}
                        </span>
                }
            </div>
            <div className="flex">
                {
                    value?.setDate &&
                    <div className="flex gap-5 justify-end px-4">
                        <span className="text-indicator-tomato text-14 tracking-[-0.07em]">
                            {diff == 0 ? "" : diff} {day}
                        </span>
                        <span className="text-14 tracking-[0.01em]">
                            {moment(value?.setDate).format("DD-MM-YYYY")}
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