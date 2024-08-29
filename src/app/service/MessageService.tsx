import { IChatMessage, IMsgByInbox } from "../types/message";
import axios from 'axios';

const endPoint = 'https://simple-foundation.vercel.app/api/message';

export const MessageService = {
    getMessages() {
      return axios.get(endPoint)
      .then(({data}) => data as IChatMessage[])
    },
    getMsgByInbox(id: string | number) {
      return axios.get(endPoint + "?inboxId=" + id)
      .then(({data}) => data as IChatMessage[])
    },
    addMessage(data: IChatMessage) {
      return axios.post(endPoint, data)
      .then(({data}) => data as IChatMessage)
    },
    updateMessage(data: IChatMessage) {
      return axios.put(endPoint + "/" + data.id, data)
      .then(({data}) => data as IChatMessage)
    } 
};