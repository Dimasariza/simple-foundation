import { useRef, useState } from "react";
import { IEditTaskItem, ITaskItemProps, ITaskList } from "../../types/task-list";
import AppDatePicker from "../date-picker/date-picker";
import { Panel } from "primereact/panel";
import Image from "next/image";
import moment from "moment";
import styled from "styled-components";
import AppTextArea from "../text-area/text-area";
import TaskItemHeader from "./task-item-header";
import { Menu } from "primereact/menu";
import { Button } from "primereact/button";
import { MenuItem } from "primereact/menuitem";
import AppButton from "../button/button";
import { Chip } from "primereact/chip";

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

function TaskListBody ({data, setTaskListData}: ITaskItemProps) {
    const [edit, setEdit] = useState<IEditTaskItem>({
        taskTitle: false,
        taskDescription: false
    });
    const [collapsed, setCollapsed] = useState<boolean>(true);

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
        <div className="mx-12">
            <div className="px-5 grid-cols-12 grid">
                <div className="flex">
                    <Image alt="clock" src={`/icons/clock-${data?.setDate ? "active" : "deactive"}.svg`} width={20} height={20} />
                </div>
                <AppDatePicker 
                    className="col-span-11" 
                    dateFormat="dd-mm-yy" 
                    value={new Date(data?.setDate)} 
                    onChange={(e) => handleEditData("setDate", moment(e?.value).format("YYYY-MM-DD"))} 
                />
            </div>

            <div className="px-5 grid-cols-12 grid">
                <div className="flex">
                    <Image width={15} height={15} alt="Edit task list" src={`/icons/pencil-${data?.description ? "active" : "deactive"}.svg`} />
                </div>
                <div className="col-span-11 my-5">
                    {
                        edit.taskDescription 
                        ? <AppTextArea className="w-full" value={data?.description} autoResize onChange={(e) => handleEditData("description", e.target.value)}/>
                        : <p className="cursor-pointer tracking-[-0.04em] min-h-5 min-w-[500px] leading-5" onClick={() => handleEditing("taskDescription")}>
                            {data?.description}
                        </p>
                    }
                </div> 
            </div>

            <div className="px-2 mx-2 py-2 grid-cols-12 grid bg-chips-bg">
                <div className="flex">
                    <Menu 
                        model={chipItems.map((c) => {
                            const chip = data?.chips?.find(i => i == c.label)
                            return {
                                ...c,
                                command: () => {
                                    handleEditData("chips", [...data.chips, c.label]) 
                                },
                                disabled: chip
                            }
                        })} 
                        popup 
                        ref={menuLeft} 
                        className="w-[270px] p-0" 
                        pt={{
                            label: (item) => ({
                                className: "text-primary-gray1 text-[10px] font-extrabold tracking-[0.1em] font-lato"
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
                            <Image width={20} height={20} alt="Edit task list" src={`/icons/bookmark-${data?.chips?.length ? "active" : "deactive"}.svg`} />
                        } 
                    />
                </div>
                <div className="min-w-[500px]">
                    {
                        data.chips.map(i => {
                            const { className }: any = chipItems.find(chip => chip.label == i)
                            return <Chip label={i} className={`${className} w-48 m-1 rounded-border-rad font-lato text-primary-gray1 text-[12px] font-bold tracking-[0.1em]`} />
                        })
                    }
                </div>
            </div>
        </div>
    )

    return (
        <StyledPanel 
            className="p-0 border-none"
            collapsed={collapsed}
            onToggle={() => setCollapsed(prev => !prev)}
            headerTemplate={(options) => <TaskItemHeader 
                options={options} 
                data={data} 
                setTaskListData={setTaskListData} 
                collapsed={collapsed} 
                setCollapsed={setCollapsed} 
                />
            } 
            toggleable 
        >
            {panelBodyTemplate}
        </StyledPanel>
    )
}

export default TaskListBody;