import { IGroupMessege, IPersonalMessege } from "./chat";
import { IUser } from "./user";

export interface IInbox {
    id: string;
    inboxGroup: "personal" | "group";
    name: string;
    lastMessege: IPersonalMessege | IGroupMessege;
    messege: IPersonalMessege[] | IGroupMessege[];
    user: IUser;
}