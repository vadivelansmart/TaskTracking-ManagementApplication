import express from "express";
import { createUser, deleteUserById, getAllUsers, getUserById, loginUser, updateUser } from "../controllers/userController";
import { verifyToken } from "../middleware";

const router = express.Router();
router.post("/register", createUser);
router.post("/login", loginUser);
router.use(verifyToken);
router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.delete('/:id', deleteUserById);
router.put("/updateUser", updateUser);


export { router as UserRoute };
