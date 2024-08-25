import { IGroupMessege, IChatMessage } from "./chat";
import { IUser } from "./user";

export interface IInbox {
    id: string;
    inboxGroup: "personal" | "group";
    name: string;
    lastMessege: IChatMessage | IGroupMessege;
    message: IChatMessage[] | IGroupMessege[];
    user: IUser;
}