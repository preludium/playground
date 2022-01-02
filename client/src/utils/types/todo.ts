import { MongoDocument } from './common';

export enum TodoTypes {
    TODO = 'TODO',
    IN_PROGRESS = 'IN_PROGRESS',
    DONE = 'DONE'
}

export interface Todo extends MongoDocument {
    name: string;
    type: TodoTypes;
}
