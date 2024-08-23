import { ITaskList } from "../types/task-list";
import axios from 'axios';

const endPoint = '/demo/data/task-list.json'

export const TaskListService = {
    getTaskList() {
      return axios.get(endPoint)
      .then(({data}) => data.data as ITaskList[])
    },
};