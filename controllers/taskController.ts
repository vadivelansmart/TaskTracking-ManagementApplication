import { Request, Response } from "express";
import { ITask } from "../dto";
import { Task, TeamMember, Comment } from "../models";
import { getNextTaskID } from "../utils";
import { OPENAI_KEY } from "../config";
import OpenAI from "openai";
import {
    ERROR_FETCHING_TASKS, FAILED_TO_ASSIGN_TASK, FAILED_TO_CREATE_TASK, FAILED_TO_DELETE, FAILED_TO_FETCH_TASKS, FAILED_TO_UPDATE_TASK, INTERNAL_SERVOR_ERROR,
    TASK_DELETED_SUCCESSFULLY, TASK_NOT_FOUND, USER_ID_REQUIRED, USER_NOT_ALLOWED
} from "../constants";

const openai = new OpenAI({
    apiKey: OPENAI_KEY,
});

export const createTask = async (req: Request, res: Response) => {
    try {
        const task: ITask = req.body;

        //checking  task Assigned user is part of the team or not.
        if (task.assignedTo) {
            const userInTeam = await TeamMember.findOne({
                user: task.assignedTo,
                team: task.teamId,
            }).exec();

            if (!userInTeam) {
                return res.status(400).json({ message: USER_NOT_ALLOWED });
            }
        }
        task.taskID = await getNextTaskID();
        const newTask = new Task(task);
        await newTask.save();

        return res.status(201).json(newTask);
    } catch (error) {
        return res.status(500).json({ message: FAILED_TO_CREATE_TASK });
    }
};

export const assignTask = async (req: Request, res: Response) => {
    try {
        const { taskId } = req.params;
        const { assignedTo } = req.body;
        const updatedTask = await Task.findOneAndUpdate({ taskID: taskId }, { assignedTo }, { new: true });

        if (!updatedTask) {
            return res.status(404).json({ message: TASK_NOT_FOUND });
        }
        const io = req.app.get("io");
        io.to(assignedTo).emit("taskAssigned", { message: `You have been assigned a new task: ${updatedTask.title}` });

        return res.status(200).json(updatedTask);
    } catch (error) {
        res.status(500).json({ message: FAILED_TO_ASSIGN_TASK });
    }
};

export const updateTask = async (req: Request, res: Response) => {
    try {
        const taskId = req.params.taskId;
        const update = req.body;
        const updatedTask = await Task.findByIdAndUpdate(taskId, update, { new: true });
        if (!updatedTask) {
            return res.status(404).json({ message: TASK_NOT_FOUND });
        }
        res.status(200).json(updatedTask);
    } catch (error) {
        res.status(500).json({ message: FAILED_TO_UPDATE_TASK });
    }
}
export const getTasksForUser = async (req: any, res: Response) => {
    try {
        const userId = req.user.id;
        if (!userId) {
            return res.status(400).json({ message: USER_ID_REQUIRED });
        }
        const tasks = await Task.find({ assignedTo: userId });

        return res.status(200).json({ tasks });
    } catch (error) {
        return res.status(500).json({ message: FAILED_TO_FETCH_TASKS });
    }
};

export const getAllTasks = async (req: Request, res: Response) => {
    try {
        const tasks = await Task.find();
        return res.status(200).json({ tasks });
    } catch (error) {
        return res.status(500).json({ message: FAILED_TO_FETCH_TASKS });
    }
};

export const deleteTask = async (req: Request, res: Response) => {
    try {
        const taskId = req.params.taskId;

        if (!taskId) {
            return res.status(400).json({ message: "Task ID is required" });
        }
        const deletedTask = await Task.findByIdAndDelete(taskId);

        if (!deletedTask) {
            return res.status(404).json({ message: TASK_NOT_FOUND });
        }

        return res.status(200).json({ message: TASK_DELETED_SUCCESSFULLY });
    } catch (error) {
        return res.status(500).json({ message: FAILED_TO_DELETE });
    }
};

export const createAiTask = async (req: any, res: Response) => {
    try {
        const { title, userId, teamId } = req.body;
        const response = await openai.completions.create({
            model: "davinci-002",
            prompt: `Generate a task description for a task titled "${title}"`,
            max_tokens: 50,
        });

        const description = response.choices[0].text.trim();
        const task = new Task({
            taskID: await getNextTaskID(),
            title,
            description,
            state: "New",
            subState: "Not Started",
            assignedTo: userId,
            createdBy: req.user.id,
            team: teamId,
        });
        await task.save();
        res.status(201).json(task);
    } catch (err) {
        res.status(500).json({ message: INTERNAL_SERVOR_ERROR });
    }
};

export const searchTask = async (req: Request, res: Response) => {
    const { title, description, substatus, createdDate, dueDate } = req.query;
    const query: any = {};

    if (title) {
        query.title = { $regex: new RegExp(title as string, "i") };
    }

    if (description) {
        query.description = { $regex: new RegExp(description as string, "i") };
    }
    if (substatus) {
        query.substatus = substatus;
    }

    if (createdDate) {
        query.createdAt = { $gte: new Date(createdDate as string) };
    }

    if (dueDate) {
        query.dueDate = { $gte: new Date(dueDate as string) };
    }

    try {
        const tasks = await Task.find(query);
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: ERROR_FETCHING_TASKS });
    }
};



