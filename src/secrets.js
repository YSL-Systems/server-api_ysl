import dotenv from 'dotenv';

dotenv.config({ path: '.env' });

export const PORT = process.env.PORT;
export const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET;
export const JWT_REFRECH_SECRET = process.env.JWT_REFRECH_SECRET;
