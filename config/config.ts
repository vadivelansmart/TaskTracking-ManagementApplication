import dotenv from 'dotenv';

dotenv.config();
export const { MONGO_URI, PORT, SECRET_KEY, OPENAI_KEY } = process.env;
export const passwordSalt :number = 8;
