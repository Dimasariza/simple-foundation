import axios from "axios";
import { IUser } from "../types/user";

const endPoint = 'https://simple-foundation.vercel.app/api/user';

export const UserService = {
    getUsers() {
      return axios.get(endPoint)
      .then(({data}) => data as IUser[])
    },
    getGroupMsg() {

    }
};