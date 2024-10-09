export type TaskType = {
    id: number;
    title: string;
    description?: string;
    type?: string;
    assignee?: string;
    points?: number;
    status: string;
};
