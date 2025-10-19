import {z} from 'zod';

export const signupSchema = z.object({
    name: z.string().trim().min(2, 'Name is required').max(255),
    email: z.email().lowercase().trim().max(255),
    password: z.string().min(6, 'Password must be at least 6 characters long').max(255),
    role: z.enum(['user', 'admin']).default('user'),
})
export const signinSchema = z.object({
    email: z.email().lowercase().trim().max(255),
    password: z.string().min(6, 'Password must be at least 6 characters long').max(255)
})