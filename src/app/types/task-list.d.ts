export interface ITaskList {
    id: string | number; 
    completed: boolean;
    taskTitle?: string | any;
    setDate: string;
    description: string;
    [key: string]: any;
}

export interface ITaskItemProps {
    data: ITaskList;
    setTaskListData: Dispatch<ITaskList[]>;
    setCollapsed?: Dispatch<boolean>;
    collapsed?: boolean;
    taskListData?: ITaskList[]
    options?: any;
}

export interface IEditTaskItem {
    taskTitle: boolean;
    taskDescription: boolean;
    [key: string]: any;
}