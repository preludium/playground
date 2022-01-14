import { Todo } from '@utils/types';

export type CreateTodo = Pick<Todo, 'name' | 'order' | 'type'>;
