export interface Todo {
    id: string;
    name: string;
    order: number;
    type: TodoType;
    createdAt: Date;
    updatedAt: Date;
}

export enum TodoType {
    TODO = 'TODO',
    IN_PROGRESS = 'IN_PROGRESS',
    DONE = 'DONE'
}

export type NewTodoRequest = Pick<Todo, 'name' | 'type' | 'order'>;
