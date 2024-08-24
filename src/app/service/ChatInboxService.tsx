import { IChatMessege } from "../types/chat";
import axios from 'axios';

const endPoint = '/demo/data/message.json';

export const ChatInboxService = {
    getMesseges() {
      return axios.get(endPoint)
      .then(({data}) => data.data as IChatMessege[])
    },
    getMsgByInbox(inboxId: string | number) {
      return axios.get(endPoint)
      .then(({data}) => data.data.find((i: IChatMessege) => i.inboxId == inboxId) as IChatMessege[])
    }
};