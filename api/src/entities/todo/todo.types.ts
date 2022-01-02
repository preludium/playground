import { Document } from 'mongoose';

export enum TodoTypes {
    TODO = 'TODO',
    IN_PROGRESS = 'IN_PROGRESS',
    DONE = 'DONE'
}

export interface Todo extends Document {
    name: string;
    type: TodoTypes;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
}

export type TodoResponse = Omit<Todo, '_id' | 'userId'> & { id?: string };

export type TodoRequest = Pick<Todo, 'name' | 'type'>;
