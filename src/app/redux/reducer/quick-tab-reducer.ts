export const QuickTabsReducer = (state: any = { tab: '' }, { type, tab }: any) => {
    switch (type) {
        case 'Task':
        case 'Inbox':
        case 'Group-Inbox':
        case 'Personal-Inbox':
        case 'Other':
            return {
                ...state,
                tab
            };
        case 'close':
        return {
            ...state,
            tab: null
        }
        default:
            return state;
    }
};