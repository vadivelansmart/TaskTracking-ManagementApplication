import express from "express";
import { createTaskComment, deleteComment, getCommentByTaskId } from "../controllers";
import { verifyToken } from "../middleware";

const router = express.Router();

router.use(verifyToken);
router.post('/:taskId/create',createTaskComment );
router.get('/:taskId', getCommentByTaskId);
router.delete('/:commentId', deleteComment);

export { router as CommentRoute };
