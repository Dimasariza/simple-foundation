import { useState } from "react";
import { IEditTaskItem, ITaskItemProps, ITaskList } from "../../types/task-list";
import AppDatePicker from "../date-picker/date-picker";
import { Panel } from "primereact/panel";
import Image from "next/image";
import moment from "moment";
import styled from "styled-components";
import AppTextArea from "../text-area/text-area";
import TaskItemHeader from "./task-item-header";

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