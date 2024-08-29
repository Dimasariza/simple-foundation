import { useEffect, useRef, useState } from "react";
import { IEditTaskItem, ITaskItemProps, ITaskList } from "@/types/task-list";
import { Panel } from "primereact/panel";
import { Menu } from "primereact/menu";
import { MenuItem } from "primereact/menuitem";
import { Chip } from "primereact/chip";
import AppDatePicker from "@/component/date-picker/date-picker";
import Image from "next/image";
import moment from "moment";
import styled from "styled-components";
import AppTextArea from "@/component/text-area/text-area";
import TaskItemHeader from "./task-item-header";
import AppButton from "@/component/button/button";
import { TaskListService } from "@/service/TaskListService";
const url = process.env.PUBLIC_URL || ""

const StyledPanel = styled(Panel)`
    .p-panel-header {
        padding: 0;
    }

    .p-panel-content {
        padding: 0;
        border: 0;
    }
`;

function TaskListBody ({data, setSubmit}: ITaskItemProps) {
    console.log(data)
    const [edit, setEdit] = useState<IEditTaskItem>({
        taskTitle: false,
        taskDescription: false
    });
    const [value, setValue] = useState<ITaskList>(data);
    const [collapsed, setCollapsed] = useState<boolean>(true);
    const handleEditing = (name: string) => {
        setEdit((prev) => ({...prev, [name]: !prev[name]}))
    }

    const handleEditData = (key: string, newData: any) => {
        setValue((prev) => ({...prev, [key]: newData}));
    }

    const handleOnSubmit = () => {
        console.log(value)
        // debugger;
        // TaskListService.updateTaskList(value)
        // .then(res => {
        //     setSubmit((prev: boolean) => !prev)
        // })
    }

    const menuLeft = useRef<Menu>(null);
    const chipItems: MenuItem[] = [
        { label: "Important ASAP", className: "bg-chips-aliceblue" },
        { label: "Offline Meeting", className: "bg-chips-sandybrown" },
        { label: "Virtual Meeting", className: "bg-chips-blanchedalmond" },
        { label: "ASAP", className: "bg-chips-cyan" },
        { label: "Client Related", className: "bg-chips-limegreen" },
        { label: "Self Task", className: "bg-chips-darkpurple" },
        { label: "Appointments", className: "bg-chips-lightpurple" },
        { label: "Court Related", className: "bg-chips-oceanblue" }
    ];

    const panelBodyTemplate = (
        <div>
            <div className="px-12 grid-cols-16 grid">
                <div className="flex">
                    <Image alt="clock" src={`${url}/icons/clock-${value?.setDate ? "active" : "deactive"}.svg`} width={20} height={20} />
                </div>
                <AppDatePicker 
                    className="col-span-11" 
                    dateFormat="dd-mm-yy" 
                    value={new Date(value?.setDate)} 
                    onChange={(e) => {
                        handleEditData("setDate", moment(e?.value).format("YYYY-MM-DD"));
                    }} 
                />
            </div>

            <div className="px-12 grid-cols-16 grid">
                <div className="flex cursor-pointer" onClick={() => handleEditing("taskDescription")}>
                    <Image width={15} height={15} alt="Edit task list" src={`${url}/icons/pencil-${value?.description ? "active" : "deactive"}.svg`} />
                </div>
                <div className="my-5 col-start-2 col-end-16">
                    {
                        edit.taskDescription 
                        ?   <AppTextArea 
                                autoFocus
                                onBlur={() => {
                                    handleEditing("taskDescription");
                                    handleOnSubmit();
                                }}
                                className="w-full" 
                                value={value?.description} 
                                autoResize 
                                onChange={(e) => handleEditData("description", e.target.value)}
                            />
                        :   <p className="cursor-pointer tracking-[-0.04em] min-h-5 min-w-[500px] leading-5"   
                            onClick={() => handleEditing("taskDescription")}>
                                {value?.description}
                            </p>
                    }
                </div> 
            </div>

            <div className="mx-10 px-1 rounded-border-rad py-2 grid-cols-16 grid bg-chips-bg">
                <div className="flex">
                    <Menu 
                        model={chipItems.map((c) => {
                            const chip = value?.chips?.find(i => i == c.label)
                            return {
                                ...c,
                                command: () => {
                                    handleEditData("chips", [...value?.chips, c.label]) 
                                },
                                disabled: chip
                            }
                        })} 
                        popup 
                        ref={menuLeft} 
                        className="w-[270px] p-0" 
                        pt={{
                            label: (item) => ({
                                className: "text-primary-gray1 text-10 font-extrabold tracking-[0.1em] font-lato"
                            }),
                            menuitem: (item) => ({
                                className: "m-[10px] rounded-border-rad h-[30px]"
                            }),
                        }}
                    />
                    <AppButton 
                        className="p-0 m-0 w-[20px] h-[20px]" 
                        text 
                        onClick={(event) => menuLeft.current!.toggle(event)} 
                        aria-controls="popup_menu_left" 
                        aria-haspopup 
                        icon={
                            <Image width={20} height={20} alt="Edit task list" src={`${url}/icons/bookmark-${value?.chips?.length ? "active" : "deactive"}.svg`} />
                        } 
                    />
                </div>
                <div className="min-w-[500px]">
                    {
                        value?.chips?.map((i, key) => {
                            const { className }: any = chipItems.find(chip => chip.label == i)
                            return <Chip 
                                    onClick={() => handleEditData("chips", value?.chips.filter(chip => chip != i))}
                                    key={i + key} 
                                    label={i} 
                                    className={`${className} w-32 m-1 rounded-border-rad font-lato text-primary-gray1 text-14 font-bold tracking-[-0.01em] cursor-pointer`} 
                                />
                        })
                    }
                </div>
            </div>
        </div>
    )

    return (
        <StyledPanel 
            className="pb-4 border-t-none mx-5 border-b border-primary-gray2 font-lato"
            collapsed={collapsed}
            onToggle={() => setCollapsed(prev => !prev)}
            headerTemplate={(options) => <TaskItemHeader 
                options={options} 
                data={data} 
                collapsed={collapsed} 
                setCollapsed={setCollapsed} 
                setSubmit={setSubmit}
                />
            } 
            toggleable 
        >
            {panelBodyTemplate}
        </StyledPanel>
    )
}

export default TaskListBody;