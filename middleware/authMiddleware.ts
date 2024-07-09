import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { User } from '../models'
import {SECRET_KEY} from "../config";
import dotenv from 'dotenv';

dotenv.config();

interface UserInfo {
  id: string;
}

export const signToken = (userInfo: UserInfo): string => {
  const token = jwt.sign(
    { id: userInfo.id },
    SECRET_KEY as string,
    { expiresIn: 86400 }
  );
  return token;
};

export const verifyToken = async (req: any, res: Response, next: NextFunction): Promise<void> => {
  try {
    const token = req.headers['authorization'];
    if (!token) {
      res.status(401).json({ message: "Authorization header not found" });
      return;
    }
    const decoded = jwt.verify(token, SECRET_KEY as string) as jwt.JwtPayload;
    const user = await User.findOne({ _id: decoded.id });
    if (user === null) {
      res.status(500).json({ message: "Something went wrong while fetching user information." });
      return;
    }
    req.user = user ;
    next();
  } catch (err) {
    res.status(400).json({ message: "Invalid authorized token" });
  }
};
