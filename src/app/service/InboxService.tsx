import { IInbox } from "../types/inbox";
import axios from 'axios';

const endPoint = 'https://simple-foundation.vercel.app/api/inbox';

export const InboxService = {
    async getInbox() {
      return await axios.get(endPoint)
      .then(({data}) => data as IInbox[])
    },
};