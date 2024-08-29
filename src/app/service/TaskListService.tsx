import { ITaskList } from "../types/task-list";
import axios from 'axios';

const endPoint = 'https://simple-foundation.vercel.app/api/task-list';

export const TaskListService = {
    getTaskList() {
      return axios.get(endPoint)
      .then(({data}) => data as ITaskList[])
    },
    getTaskListById(id: string | number) {
      return axios.get(endPoint + "/" + id)
      .then(({data}) => data as ITaskList)
    },
    addTaskList(data: ITaskList) {
      return axios.post(endPoint, data)
      .then(({data}) => data as ITaskList[])
    },
    updateTaskList(newData: ITaskList) {
      return axios.put(endPoint + "/" + newData.id, newData)
      .then(({data}) => data as ITaskList)
    },
    deleteTaskList(id: string | number) {
      return axios.delete(endPoint + "/" + id)
      .then(({data}) => data as ITaskList)
    }
};