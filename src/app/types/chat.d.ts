export interface IChatMessage {
    deleted: boolean;
    message: string | any;
    messegeId: string | number;
    inboxId: string | number;
    sendDate: string;
    user: IUser;
    userId: string | number;
    unReadMessage: boolean;
    owner: boolean;
    divider: string;
}