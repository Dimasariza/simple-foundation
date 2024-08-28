import axios from "axios";
import { IUser } from "../types/user";

const endPoint = 'https://simple-foundation.vercel.app/api/user';

export const UserService = {
    getUsers() {
      return axios.get(endPoint)
      .then(({data}) => data as IUser[])
    },
    getUserById(id: string | number) {
      return axios.get(endPoint + "/" + id)
      .then(({data}) => data as IUser)
    },
    updateUser(id: string | number) {
      return axios.put(endPoint + "/" + id)
      .then(({data}) => data as IUser)
    },
    deleteUser(id: string | number) {
      return axios.delete(endPoint + "/" + id)
      .then(({data}) => data as IUser)
    }
};