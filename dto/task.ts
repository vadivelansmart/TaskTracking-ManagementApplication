export interface ITask {
    id: string,
    taskID: number,
    title: string,
    description?:  string,
    dueDate?: string
    state: 'New' | 'Commited' | 'Done';
    substatus: 'Not Started' | 'Code Review' | 'Completed';
    teamId?: string,
    assignedTo?: string,
    createdBy?:string
}