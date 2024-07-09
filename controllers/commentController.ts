import { Request, Response } from "express";
import { Task, Comment } from "../models";
import {
    COMMENT_DELETE_SUCCESS, COMMENT_NOT_FOUND, FAILED_TO_ADD_COMMENT, FAILED_TO_DELETE_COMMENT, FAILED_TO_FETCH_COMMENT,
    TASK_NOT_FOUND, UNAUTHORIZED_TO_DELETE_COMMENT
} from "../constants";

export const createTaskComment = async (req: any, res: Response) => {
    try {
        const { comment, attachments } = req.body;
        const taskId = req.params.taskId;
        const createdBy = req.user.id;

        const task = await Task.findById(taskId);
        if (!task) {
            return res.status(404).json({ message: TASK_NOT_FOUND });
        }
        const newComment = new Comment({
            taskId,
            comment,
            attachments,
            createdBy
        });
        const savedComment = await newComment.save();
        res.status(201).json(savedComment);
    } catch (error) {
        res.status(500).json({ message: FAILED_TO_ADD_COMMENT });
    }
}
export const getCommentByTaskId = async (req: Request, res: Response) => {
    try {
        const taskId = req.params.taskId;
        const comments = await Comment.find({ taskId });
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ message: FAILED_TO_FETCH_COMMENT });
    }
}
export const deleteComment = async (req: any, res: Response) => {
    try {
        const commentId = req.params.commentId;
        const userId = req.user._id;
        const comment = await Comment.findById(commentId);
        if (!comment) {
            return res.status(404).json({ message: COMMENT_NOT_FOUND });
        }
        if (comment.createdBy.toString() !== userId.toString()) {
            return res.status(403).json({ message: UNAUTHORIZED_TO_DELETE_COMMENT });
        }
        await Comment.findByIdAndDelete(commentId)
        res.status(200).json({ message: COMMENT_DELETE_SUCCESS });
    } catch (error) {
        res.status(500).json({ message: FAILED_TO_DELETE_COMMENT });
    }
}