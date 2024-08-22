import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { useEffect, useState } from "react";
import AppCard from "../card/card";
import { ListBox } from "primereact/listbox";
import { ITaskList } from "../../types/task-list";
import { TaskListService } from "../../service/TaskListService";
import TaskItem from "./task-item";

function AppTaskList() {
    const [selectedTask, setSelectedTask] = useState(null);
    const [taskListData, setTaskListData] = useState<ITaskList[]>();

    const taskOptions = [
        { name: 'Personal Errands', code: 'personal' },
        { name: 'Urgent To-Do', code: 'urgent' },
    ];

    const cardHeaderTemplate = () => {
        return (
            <div className="flex w-full justify-around">
                <Dropdown 
                    value={selectedTask} 
                    onChange={(e) => setSelectedTask(e.value)} 
                    options={taskOptions} 
                    optionLabel="name" 
                    placeholder="Select Task" 
                    className="md:w-14rem" 
                />
                <Button label="New Task" className="bg-primary-blue"/>
            </div>
        )
    }

    useEffect(() => {
        TaskListService.getTaskList()
        .then((res: ITaskList[]) => setTaskListData(res))
    }, [])

    return (
        <AppCard style={{overflow: "visible"}} >
            <ListBox 
                className="w-full md:w-14rem border-none" 
                listStyle={{ maxHeight: '680px', overflow: "auto" }} 
                filter 
                filterTemplate={cardHeaderTemplate} 
                options={taskListData?.map((i: any, key: number) => <TaskItem key={i?.title + key} data={i} setTaskListData={setTaskListData}/>)}
            />
        </AppCard>
    )
}

export default AppTaskList;