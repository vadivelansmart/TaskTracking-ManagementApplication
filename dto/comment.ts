
export interface IComment extends Document {
    taskId: string;
    comment: string;
    attachments?: string[];
    createdBy: string;
    createdAt: Date;
    updatedAt: Date;
}