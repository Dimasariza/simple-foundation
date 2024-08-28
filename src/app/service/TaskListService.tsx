import { ITaskList } from "../types/task-list";
import axios from 'axios';

const endPoint = 'https://simple-foundation.vercel.app/api/task-list';

export const TaskListService = {
    getTaskList() {
      return axios.get(endPoint)
      .then(({data}) => data.data as ITaskList[])
    },
};