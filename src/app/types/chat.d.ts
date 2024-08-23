interface IMessege {
    deleted: boolean;
    messege: string | any;
    messegeId: string | number;
    inboxId: string | number;
    sendDate: Date;
    user: IUser;
    userId: string | number;
    unReadMessege: boolean;
}

export interface IPersonalMessege extends IMessege {

}

export interface IGroupMessege extends IMessege {

}