import { Request, Response } from "express";
import { IUser, ILogin } from "../dto";
import { UserValidator, generatePassword, validatePassword } from "../utils";
import { User } from "../models";
import { signToken } from "../middleware";
import {
    USER_CREATED, INTERNAL_ERROR, INVALID_CREDENTIALS, ERROR_MESSAGE, INVALID_PASSWORD, INVALID_LOGIN_INFORMATION, USER_ID_NOT_FOUND_IN_REQUEST, USER_NOT_FOUND, USER_UPDATED_SUCCESSFULLY,
    ERROR_UPDATING_USER, INTERNAL_SERVOR_ERROR, UNAUTHORIZED_ONLY_ADMIN_CAN_DELETE, USER_DELETED_SUCCESSFULLY, LOGIN_SUCCESS
} from "../constants";

export const createUser = async (req: Request, res: Response) => {
    try {
        const isValid = await UserValidator(<IUser>req.body);
        if (!isValid.valid) {
            return res.status(400).json({ message: ERROR_MESSAGE[isValid.type] });
        }
        const { firstName, lastName, email, password, phoneNumber, role } = req.body;
        const hashPassword = await generatePassword(password);
        const newUSer = await User.create({
            firstName,
            lastName,
            email,
            password: hashPassword,
            phoneNumber,
            role,
        });
        if (newUSer) {
            return res.status(200).json({ message: USER_CREATED });
        }
    } catch (err) {
        return res.status(500).json({ message: INTERNAL_ERROR });
    }
};

export const loginUser = async (req: Request, res: Response) => {
    try {
        const isValid = await UserValidator(<ILogin>req.body);
        if (isValid.valid) {
            return res.status(400).json({ message: INVALID_CREDENTIALS, info: isValid.info });
        }
        const userInfo: any = isValid.info;
        const validation = await validatePassword(req.body.password, userInfo.password as string);
        if (!validation) {
            return res.status(400).json({ message: INVALID_PASSWORD });
        }
        const token = signToken(userInfo);
        if (!token) {
            return res.status(500).json({ message: INVALID_LOGIN_INFORMATION });
        }
        res.status(200).json({
            user: {
                id: userInfo.id,
            },
            message: LOGIN_SUCCESS,
            token: token,
        });
    } catch (err) {
        res.status(500).json({ message: INTERNAL_ERROR });
    }
};

export const updateUser = async (req: any, res: Response) => {
    try {
        const userId = req.user?.id;
        const updateData: Partial<IUser> = req.body;
        if (!userId) {
            res.status(400).json({ message: USER_ID_NOT_FOUND_IN_REQUEST });
            return;
        }
        const updatedUser = await User.findByIdAndUpdate(userId, updateData, { new: true });
        if (!updatedUser) {
            res.status(404).json({ message: USER_NOT_FOUND });
            return;
        }
        res.status(200).json({ message: USER_UPDATED_SUCCESSFULLY, user: updatedUser });
    } catch (err: any) {
        res.status(500).json({ message: ERROR_UPDATING_USER, error: err.message });
    }
};

export const getUserById = async (req: Request, res: Response) => {
    try {
        const userId = req.params.id;
        const user = await User.findById(userId);

        if (!user) {
            res.status(404).json({ message: USER_NOT_FOUND });
            return;
        }
        res.status(200).json({ user });
    } catch (err: any) {
        res.status(500).json({ message: INTERNAL_SERVOR_ERROR });
    }
};

export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.find();
        res.status(200).json({ users });
    } catch (err: any) {
        res.status(500).json({ message: INTERNAL_SERVOR_ERROR });
    }
};

export const deleteUserById = async (req: any, res: Response): Promise<void> => {
    try {
        const userId = req.params.id;
        const loggedInUserRole = req.user.role;

        // Checking  if the logged-in user has admin role
        if (loggedInUserRole !== 'admin') {
            res.status(403).json({ message: UNAUTHORIZED_ONLY_ADMIN_CAN_DELETE });
            return;
        }
        const deletedUser = await User.findByIdAndDelete(userId);
        if (!deletedUser) {
            res.status(404).json({ message: USER_NOT_FOUND });
            return;
        }
        res.status(200).json({ message: USER_DELETED_SUCCESSFULLY });
    } catch (err: any) {
        res.status(500).json({ message: INTERNAL_SERVOR_ERROR });
    }
};

