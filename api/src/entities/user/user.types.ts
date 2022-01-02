import { Roles } from '@utils/constants';
import { Document } from 'mongoose';
import { Token } from '../token';

export interface User extends Document {
    email: string;
    password: string;
    roles: Roles[];
    createdAt: Date;
    updatedAt: Date;
    refreshToken: Token;
    comparePassword(candidatePassword: string): Promise<boolean>;
}

export type UserResponse = Omit<User, 'password' | 'comparePassword' | '_id'> & { id?: string };

export type UserRequest = Pick<User, 'email' | 'password'>;
