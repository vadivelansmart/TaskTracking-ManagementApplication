import express from 'express'
import {assignTask, createAiTask, createTask, deleteTask, getAllTasks, getTasksForUser, searchTask, updateTask} from '../controllers'
import { verifyToken } from '../middleware';
const router = express.Router();

router.use(verifyToken)
router.get('/', getAllTasks);
router.post('/create', createTask);
router.put('/:taskId', updateTask)
router.get('/assigned-to-me', getTasksForUser);
router.post('/assign/:taskId', assignTask);
router.delete('/:taskId', deleteTask);
router.post('/createAI', createAiTask);
router.get('/search', searchTask);

export {router as TaskRoute};