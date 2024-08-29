import { MenuContext, MenuPassThroughMethodOptions } from "primereact/menu";
import { MenuItem } from "primereact/menuitem";

export interface ITaskList {
    id: string | number; 
    completed: boolean;
    taskTitle?: string | any;
    setDate: string;
    description: string;
    chips: any[];
    [key: string]: any;
}

export interface ITaskItemProps {
    data: ITaskList;
    setCollapsed?: Dispatch<boolean>;
    setSubmit?: any;
    collapsed?: boolean;
    taskListData?: ITaskList[]
    options?: any;
}

export interface IEditTaskItem {
    taskTitle: boolean;
    taskDescription: boolean;
    [key: string]: any;
}

declare namespace IMenuItems {
    interface IMenu extends MenuItem {
        labelClass: string
    }
    
    interface IMenuContextPT extends MenuContext {
        item: IMenu
    }
    
    interface IMenuPT extends MenuPassThroughMethodOptions {
        labelClass: string
        context: IMenuContextPT
    }
}