export interface ITaskList {
    id: string | number; 
    completed: boolean;
    title: string;
    setDate: string;
    description: string;
}

export interface ITaskItemProps {
    data: ITaskList;
    setTaskListData: Dispatch<ITaskList[] | any>;
}

export interface IEditTaskItem {
    taskTitle: boolean;
    taskDescription: boolean;
    [key: string]: any;
}