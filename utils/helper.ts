import {Task} from '../models'

export const getNextTaskID = async () => {
    const task = await Task.findOne().sort({ taskID: -1 }).exec();
    return task ? task.taskID + 1 : 10000; // Start from 10000 if no tasks exist
};