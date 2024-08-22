export interface IInbox {
    id: string;
    inboxGroup: "personal" | "group";
    lastMassage: any;
    name: string;
    unReadMessege: boolean;
}