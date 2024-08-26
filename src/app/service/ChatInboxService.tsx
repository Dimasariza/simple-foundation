import { IChatMessage } from "../types/chat";
import axios from 'axios';

const endPoint = '/demo/data/message.json';

export const ChatInboxService = {
    getMessages() {
      return axios.get(endPoint)
      .then(({data}) => data.data as IChatMessage[])
    },
    getMsgByInbox(inboxId: string | number) {
      return axios.get(endPoint)
      .then(({data}) => data.data.find((i: IChatMessage) => i.inboxId == inboxId) as IChatMessage[])
    }
};