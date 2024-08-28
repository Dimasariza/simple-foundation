export const QuickTabsAction = (activeTab: any) => {
    return {
      type: activeTab?.name,
      tab: activeTab
    };
};