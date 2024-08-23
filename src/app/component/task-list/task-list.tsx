import { Button } from "primereact/button";
import { Dropdown, DropdownProps } from "primereact/dropdown";
import { useEffect, useState } from "react";
import AppCard from "../card/card";
import { ListBox } from "primereact/listbox";
import { ITaskList } from "../../types/task-list";
import { TaskListService } from "../../service/TaskListService";
import TaskItem from "./task-item";
import styled from "styled-components";

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

const StyledListBox = styled(ListBox)`
    font-family: var(--font-lato);

    .p-listbox-list {
        padding: 0;
    }
    .p-listbox-item {
        padding: 0;
    }
    .p-listbox-header {
        background: transparent;
        border: none;
    }
`

function AppTaskList() {
    const [selectedTask, setSelectedTask] = useState(null);
    const [taskListData, setTaskListData] = useState<ITaskList[]>();

    const taskOptions = [
        { name: 'Personal Errands', code: 'personal' },
        { name: 'Urgent To-Do', code: 'urgent' },
    ];

    const cardHeaderTemplate = () => {
        return (
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
                                className: "font-lato"
                            }
                        }}
                    />
                </div>
                <div className="flex justify-end mr-2">
                    <Button 
                        label="New Task" 
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
    }

    useEffect(() => {
        TaskListService.getTaskList()
        .then((res: ITaskList[]) => setTaskListData(res))
    }, [])

    return (
        <AppCard className="overflow-visible" >
            <StyledListBox 
                className="w-full md:w-14rem border-none" 
                listStyle={{ maxHeight: '680px', overflow: "auto" }} 
                filter 
                filterTemplate={cardHeaderTemplate} 
                options={
                    taskListData?.map((i: any, key: number) => <TaskItem key={i?.title + key} data={i} setTaskListData={setTaskListData}/>)
                }
            />
        </AppCard>
    )
}

export default AppTaskList;