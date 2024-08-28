export const ReplyMessageReducer = (state: any = null, {type, message}: any) => {
    switch(type) {
        case "REPLY_MESSAGE":
            return message
        default:
            return state
    }
}