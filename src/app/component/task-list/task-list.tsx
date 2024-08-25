import { Button } from "primereact/button";
import { Dropdown, DropdownProps } from "primereact/dropdown";
import { useEffect, useState } from "react";
import AppCard from "../card/card";
import { ITaskList } from "../../types/task-list";
import { TaskListService } from "../../service/TaskListService";
import TaskItem from "./task-item";
import styled from "styled-components";
import { DataView } from "primereact/dataview";

const StyledDropDown = styled(Dropdown)<DropdownProps>`
    border-radius: 5px;

    .p-placeholder {
        font-family: var(--font-lato);
        font-size: 16px;
        font-weight: bold;
        margin: 0;
        padding: 0;
    }

    .p-dropdown-trigger {
        width: 14px;
        height: 14px;
        margin-left: 8px;
    }
`

function AppTaskList() {
    const [selectedTask, setSelectedTask] = useState(null);
    const [taskListData, setTaskListData] = useState<ITaskList[]>([]);

    const taskOptions = [
        { name: 'Personal Errands', code: 'personal' },
        { name: 'Urgent To-Do', code: 'urgent' },
    ];

    const handleAddNewTask = () => {
        const newData: ITaskList[] = [{} as ITaskList, ...taskListData!]
        setTaskListData(newData)
    }

    const cardHeaderTemplate = (
        <div className="grid-cols-2 grid">
            <div className="pl-12 flex">
                <StyledDropDown 
                    value={selectedTask} 
                    onChange={(e) => setSelectedTask(e.value)} 
                    options={taskOptions} 
                    optionLabel="name" 
                    placeholder="My Tasks" 
                    className="md:w-14rem h-[40px] flex border-primary-gray2 items-center p-2" 
                    pt={{
                        list: {
                            className: "font-lato p-0"
                        },
                        wrapper: {
                            className: "drop-shadow-none rounded-[5px] border border-primary-gray2"
                        },
                    }}
                />
            </div>
            <div className="flex justify-end mr-2">
                <Button 
                    label="New Task" 
                    onClick={handleAddNewTask}
                    pt={{
                        label: {
                            className: "font-normal tracking-[0.01em]"
                        }
                    }} 
                    className="font-thin bg-primary-blue h-[40px] font-lato"
                />
            </div>
        </div>
    )
        
    const listTemplate: any = (items: ITaskList[]) => {
        return items?.map((i, key) => <TaskItem key={`${key + i?.title}`} data={i} taskListData={taskListData} setTaskListData={setTaskListData}/>) 
    };

    useEffect(() => {
        TaskListService.getTaskList()
        .then((res: ITaskList[]) => setTaskListData(res))
    }, [])

    return (
        <AppCard className="overflow-auto">
            <DataView pt={{header: {
                    className: "bg-transparent"
                }}} 
                value={taskListData} 
                header={cardHeaderTemplate} 
                listTemplate={listTemplate} 
            />
        </AppCard>
    )
}

export default AppTaskList;