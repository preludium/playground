import { Role } from '@utils/constants';
import { Document } from 'mongoose';
import { Token } from '../token';

export enum OauthProvider {
    GOOGLE = 'google',
}
export interface User extends Document {
    email: string;
    password?: string;
    roles: Role[];
    createdAt: Date;
    updatedAt: Date;
    providerUserId?: string;
    provider?: OauthProvider;
    refreshToken: Token;
    comparePassword(candidatePassword?: string): Promise<boolean>;
}

export type UserResponse = Omit<User, 'password' | 'comparePassword' | '_id'> & { id?: string };

export type UserRequest = Pick<User, 'email' | 'password'>;
