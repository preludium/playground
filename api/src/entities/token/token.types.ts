import { Document } from 'mongoose';

export interface Token extends Document {
    userId: string;
    hash: string;
    expiresIn: Date;
}
