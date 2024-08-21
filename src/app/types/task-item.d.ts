export interface ITaskItemProps {
    data: ITaskList
    setTaskListData: Dispatch<ITaskList[] | any>
}

export interface IEditTaskItem {
    taskTitle: boolean
    taskDescription: boolean
    [key: string]: any
}