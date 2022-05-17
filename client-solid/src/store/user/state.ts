export interface User {
    id: string;
    email: string;
    roles: Role[];
    createdAt: Date;
    updatedAt: Date;
}

export enum Role {
    ADMIN = 'ADMIN',
    USER = 'USER'
}
