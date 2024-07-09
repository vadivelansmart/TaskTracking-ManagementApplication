
import bcrypt from "bcrypt";
import { passwordSalt } from "../config";

export const generatePassword = async (password: string): Promise<string> => {
    return bcrypt.hash(password, passwordSalt);
}

export const validatePassword = async (password: string, savedPassword: string): Promise<boolean> => {
    return bcrypt.compare(password, savedPassword);
}

