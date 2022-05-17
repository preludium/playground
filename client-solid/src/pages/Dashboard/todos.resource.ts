import { createResource } from 'solid-js';
import axios from 'utils/axios';
import { Todo } from '.';

const createTodosResource = () => {
    const [todos, { mutate, refetch }] = createResource<Todo[]>(
        () => axios.get('/api/todos-current').then(res => res.data),
        { initialValue: [] },
    );

    return { todos, mutateTodos: mutate, refetchTodos: refetch };
};

export const { todos, mutateTodos, refetchTodos } = createTodosResource();
