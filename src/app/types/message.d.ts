export interface IChatMessage {
    deleted: boolean;
    message: string | any;
    inboxId: string | number;
    sendDate: string;
    user: IUser;
    userId: string | number;
    unReadMessage: boolean;
    owner: boolean;
    divider: string;
    repliedMsgId: string | number;
    repliedMessage: IChatMessage;
    id: string | number;
}

export interface IMsgByInbox {
    id: string | any
    message: IChatMessage[]
}