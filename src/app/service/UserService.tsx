import axios from "axios";
import { IUser } from "../types/user";

const endPoint = '/demo/data/user.json';

export const UserService = {
    getUsers() {
      return axios.get(endPoint)
      .then(({data}) => data.data as IUser[])
    },
    getGroupMsg() {

    }
};