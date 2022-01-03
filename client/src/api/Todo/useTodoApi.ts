import axios, { AxiosResponse } from '@utils/axios';
import { Todo, TodoDnD } from '@utils/types';

interface TodoApiHook {
    get: (todoId: string) => Promise<AxiosResponse<Todo>>;
    getAll: () => Promise<Todo[]>;
    update: (todo: Todo) => Promise<Todo>;
    updateAll: (todos: (Todo | TodoDnD)[]) => Promise<AxiosResponse<void>>;
    create: (todo: Todo) => Promise<AxiosResponse<Todo>>;
    remove: (todoId: string) => Promise<AxiosResponse<void>>;
}

const useTodoApi = (): TodoApiHook => {
    const getAll = () => axios
        .get<Todo[]>('/api/todos-current')
        .then(response => response.data);

    const get = (todoId: string) => axios
        .get<Todo>(`/api/todos/${todoId}`);

    const update = (todo: Todo) => axios
        .put<Todo>(`/api/todos/${todo.id}`, todo)
        .then(response => response.data);

    const updateAll = (todos: (Todo | TodoDnD)[]) => axios
        .put<void>('/api/todos', todos);

    const create = (todo: Todo) => axios
        .post<Todo>('/api/todos', todo);

    const remove = (todoId: string) => axios
        .delete<void>(`/api/todos/${todoId}`);

    return {
        get,
        getAll,
        update,
        updateAll,
        create,
        remove,
    };
};

export default useTodoApi;
