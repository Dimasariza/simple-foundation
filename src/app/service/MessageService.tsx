import { IChatMessage, IMsgByInbox } from "../types/message";
import axios from 'axios';

const endPoint = 'https://simple-foundation.vercel.app/api/message';

export const MessageService = {
    getMessages() {
      return axios.get(endPoint)
      .then(({data}) => data as IMsgByInbox[])
    },
    getMsgByInbox(id: string | number) {
      return axios.get(endPoint + "/" + id)
      .then(({data}) => data as IMsgByInbox)
    },
    addMessage() {

    },
    updateMessage(data: IMsgByInbox) {
      return axios.put(endPoint + "/" + data.id, data)
      .then(({data}) => data as IMsgByInbox)
    } 
};