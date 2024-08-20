import { ITaskList } from "../types/task-list";

export const TaskListService = {
    getTaskList() {
      return fetch('/demo/data/task-list.json', { headers: { 'Cache-Control': 'no-cache' } })
        .then((res) => res.json())
        .then((d) => d.data as ITaskList[]);
    },
};