import express from "express";
import { createTeam, addTeamMember, getTeamMembers, getAllTeams } from "../controllers";
import { verifyToken } from "../middleware";

const router = express.Router();

router.use(verifyToken);
router.get('/', getAllTeams);
router.post('/create', createTeam);
router.post('/addMember', addTeamMember);
router.get('/members', getTeamMembers);
export { router as TeamRoute };
