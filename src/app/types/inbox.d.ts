import { IGroupMessege, IChatMessege } from "./chat";
import { IUser } from "./user";

export interface IInbox {
    id: string;
    inboxGroup: "personal" | "group";
    name: string;
    lastMessege: IChatMessege | IGroupMessege;
    message: IChatMessege[] | IGroupMessege[];
    user: IUser;
}