import { createResource } from 'solid-js';
import { createStore } from 'solid-js/store';
import axios from 'utils/axios';
import { Todo } from '.';

export const [containers, setContainers] = createStore({
    TODO: [] as Todo[],
    IN_PROGRESS: [] as Todo[],
    DONE: [] as Todo[],
});

export const filterByType = (todos: Todo[], type: string) => todos.filter((todo) => todo.type === type);

const createTodosResource = () => {
    const [todos, { mutate, refetch }] = createResource<Todo[]>(
        () => axios.get('/api/todos-current').then(res => res.data),
        { initialValue: [] },
    );

    setContainers('TODO', filterByType(todos(), 'TODO'));
    setContainers('IN_PROGRESS', filterByType(todos(), 'IN_PROGRESS'));
    setContainers('DONE', filterByType(todos(), 'DONE'));

    return { todos, mutateTodos: mutate, refetchTodos: refetch };
};

export const { todos, mutateTodos, refetchTodos } = createTodosResource();
