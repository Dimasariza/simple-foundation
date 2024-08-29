export interface IChatMessage {
    deleted: boolean;
    message: string | any;
    messageId: string | number;
    inboxId: string | number;
    sendDate: string;
    user: IUser;
    userId: string | number;
    unReadMessage: boolean;
    owner: boolean;
    divider: string;
    repliedMsgId: string | number;
    repliedMessage: IChatMessage;
}

export interface IMsgByInbox {
    id: string | any
    message: IChatMessage[]
}