export type TaskType = {
    id: string;
    title: string;
    description?: string;
    type?: string;
    assignee?: string;
    points?: number;
    status: string;
};
