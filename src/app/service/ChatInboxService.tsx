import { ITaskList } from "../types/task-list";
import axios from 'axios';

const endPoint = 'http://localhost:3100/data'

export const TaskListService = {
    getInbox() {
      return axios.get(endPoint)
      .then((res) => res.data as ITaskList[])
    },
};