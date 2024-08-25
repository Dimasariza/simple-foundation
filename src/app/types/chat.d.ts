export interface IChatMessage {
    deleted: boolean;
    message: string | any;
    messegeId: string | number;
    inboxId: string | number;
    sendDate: Date;
    user: IUser;
    userId: string | number;
    unReadMessege: boolean;
    owner: boolean;
}