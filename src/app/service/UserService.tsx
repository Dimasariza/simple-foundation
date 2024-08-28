import axios from "axios";
import { IUser } from "../types/user";

const endPoint = 'https://simple-foundation.vercel.app/api/user';

export const UserService = {
    async getUsers() {
      return await axios.get(endPoint)
      .then(({data}) => data as IUser[])
    },
    async getUserById(id: string | number) {
      return await axios.get(endPoint + "/" + id)
      .then(({data}) => data as IUser)
    },
    async updateUser(id: string | number) {
      return await axios.put(endPoint + "/" + id)
      .then(({data}) => data as IUser)
    },
    async deleteUser(id: string | number) {
      return await axios.delete(endPoint + "/" + id)
      .then(({data}) => data as IUser)
    }
};