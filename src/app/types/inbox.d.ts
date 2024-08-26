import { IGroupMessage, IChatMessage } from "./chat";
import { IUser } from "./user";

export interface IInbox {
    id: string;
    inboxGroup: "personal" | "group";
    name: string;
    lastMessage: IChatMessage | IGroupMessage;
    message: IChatMessage[] | IGroupMessage[];
    user: IUser;
}