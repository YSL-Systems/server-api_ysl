import dotenv from 'dotenv';

dotenv.config({ path: '.env' });

export const PORT = process.env.PORT;

export const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET;
export const JWT_REFRECH_SECRET = process.env.JWT_REFRECH_SECRET;

export const BOT_TOKEN = process.env.BOT_TOKEN;
export const CHAT_ID = process.env.CHAT_ID;

export const BROKER_URL = process.env.BROKER_URL;
export const BROKER_USERNAME = process.env.BROKER_USERNAME;
export const BROKER_PASSWORD = process.env.BROKER_PASSWORD;
