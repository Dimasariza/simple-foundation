import { ITaskList } from "../types/task-list";
import axios from 'axios';

const endPoint = 'http://localhost:3101/data'

export const TaskListService = {
    getTaskList() {
      return axios.get(endPoint)
      .then((res) => res.data as ITaskList[])
    },
};