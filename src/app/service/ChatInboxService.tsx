import { IPersonalMessege } from "../types/chat";
import axios from 'axios';

const endPoint = '/demo/data/messege.json';

export const ChatInboxService = {
    getMesseges() {
      return axios.get(endPoint)
      .then(({data}) => data.data as IPersonalMessege[])
    },
    getGroupMsg() {

    }
};