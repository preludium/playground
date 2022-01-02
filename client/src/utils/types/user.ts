import { MongoDocument } from './common';

export enum Roles {
    USER = 'USER',
    ADMIN = 'ADMIN'
}

export interface User extends MongoDocument {
    email: string;
    roles: Roles[];
}
