"use client";

import { Button } from "primereact/button";
import { Dropdown, DropdownProps } from "primereact/dropdown";
import { useEffect, useState } from "react";
import { ITaskList } from "@/types/task-list";
import { TaskListService } from "@/service/TaskListService";
import { DataView } from "primereact/dataview";
import AppCard from "@/component/card/card";
import styled from "styled-components";
import TaskListBody from "./task-item";

const StyledDropDown = styled(Dropdown)<DropdownProps>`
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
    const [submit, setSubmit] = useState<boolean>(false);

    const taskOptions = [
        { name: 'Personal Errands', code: 'personal' },
        { name: 'Urgent To-Do', code: 'urgent' },
    ];

    const handleAddNewTask = () => {
        const newTaskList = {
            id: Number(taskListData.at(0)?.id) + 1,
            completed: false,
            taskTitle: "",
            setDate: "",
            chips: [],
            description: ""
        }
        TaskListService.addTaskList(newTaskList)
        .then(res => {
            setSubmit((prev) => !prev)
        })
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
                    className="md:w-14rem h-[40px] ml-12 flex border-primary-gray2 items-center p-2 rounded-border-rad" 
                    pt={{
                        list: {
                            className: "font-lato p-0 border-primary-gray2"
                        },
                        wrapper: {
                            className: "drop-shadow-none rounded-border-rad border-none"
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
        return (
            <div className="overflow-auto h-[660px]">
                {
                    items?.map((i, key) => <TaskListBody key={`${key} ${i?.title}`} data={i} setSubmit={setSubmit}/>) 
                }
            </div>
        )
    };

    useEffect(() => {
        TaskListService.getTaskList()
        .then((res: ITaskList[]) => {
            setTaskListData(res.reverse())
        })
    }, [submit])

    return (
        <AppCard className="overflow-hidden">
            <DataView 
                pt={{
                    header: {
                      className: "bg-transparent pt-4 pb-0 border-none"
                    },
                }} 
                value={taskListData} 
                header={cardHeaderTemplate} 
                listTemplate={listTemplate} 
            />
        </AppCard>
    )
}

export default AppTaskList;