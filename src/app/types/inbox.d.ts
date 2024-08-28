import { IGroupMessage, IChatMessage } from "./message";
import { IUser } from "./user";

export interface IInbox {
    id: string;
    inboxGroup: "personal" | "group";
    name: string;
    messageId: string | number,
    lastMessage: IChatMessage | IGroupMessage;
    message: IChatMessage[] | IGroupMessage[];
    user: IUser;
}