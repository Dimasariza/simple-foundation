import { IChatMessage, IMgsByInbox } from "../types/message";
import axios from 'axios';

const endPoint = 'https://simple-foundation.vercel.app/api/message';

export const ChatInboxService = {
    getMessages() {
      return axios.get(endPoint)
      .then(({data}) => data as IMgsByInbox[])
    },
    getMsgByInbox(id: string | number) {
      return axios.get(endPoint + "/" + id)
      .then(({data}) => data as IMgsByInbox)
    },
    addMessage() {

    },
    updateMessage(data: IMgsByInbox) {
      return axios.put(endPoint + "/" + data.id, data)
      .then(({data}) => data as IMgsByInbox)
    } 
};