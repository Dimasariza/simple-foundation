import { IChatMessage, IMgsByInbox } from "../types/message";
import axios from 'axios';

const endPoint = 'https://simple-foundation.vercel.app/api/message';

export const ChatInboxService = {
    getMessages() {
      return axios.get(endPoint)
      .then(({data}) => data as IMgsByInbox[])
    },
    getMsgByInbox(inboxId: string | number) {
      return axios.get(endPoint + "?inboxId=" + inboxId)
      .then(({data}) => data[0] as IMgsByInbox)
    }
};