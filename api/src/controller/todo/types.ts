import { TodoRequest } from '@entities/todo';
import { Params, Request } from '@utils/types/controller';

interface TodoRequestParams extends Params {
    todoId: string
}

// Get
export type GetTodoRequest = Request<never, never, TodoRequestParams>;

// Delete
export type DeleteTodoRequest = Request<never, never, TodoRequestParams>;

// Update
export type UpdateTodoRequest = Request<TodoRequest, never, TodoRequestParams>;

// Create

export type CreateTodoRequest = Request<TodoRequest, never, never>;
