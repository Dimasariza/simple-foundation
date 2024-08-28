import { IInbox } from "../types/inbox";
import axios from 'axios';

const endPoint = '/demo/data/inbox.json'

export const InboxService = {
    getInbox() {
      return axios.get(endPoint)
      .then(({data}) => console.log(data))
    },
};