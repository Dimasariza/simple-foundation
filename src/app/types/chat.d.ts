interface IMessege {
    deleted: boolean;
    messege: string;
    messegeId: string | number;
    inboxId: string | number;
    sendDate: Date;
    userId: string | number;
    unReadMessege: boolean;
}

export interface IPersonalMessege extends IMessege {

}

export interface IGroupMessege extends IMessege {

}