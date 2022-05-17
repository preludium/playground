import { Todo } from '.';

export interface DeleteTodoModalState {
    show: boolean;
    todo?: Todo;
}