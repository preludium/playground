import axios, { AxiosResponse } from '@utils/axios';
import { Todo } from '@utils/types';

interface TodoApiHook {
    get: (todoId: string) => Promise<AxiosResponse<Todo>>;
    getAll: () => Promise<Todo[]>;
    update: (todoId: string) => Promise<AxiosResponse<Todo>>;
    create: (todo: Todo) => Promise<AxiosResponse<Todo>>;
    remove: (todoId: string) => Promise<AxiosResponse<void>>;
}

const useTodoApi = (): TodoApiHook => {
    const getAll = () => axios
        .get<Todo[]>('/api/todos-current')
        .then(response => response.data);

    const get = (todoId: string) => axios
        .get<Todo>(`/api/todos/${todoId}`);

    const update = (todoId: string) => axios
        .put<Todo>(`/api/todos/${todoId}`);

    const create = (todo: Todo) => axios
        .post<Todo>('/api/todos', todo);

    const remove = (todoId: string) => axios
        .delete<void>(`/api/todos/${todoId}`);

    return {
        get,
        getAll,
        update,
        create,
        remove,
    };
};

export default useTodoApi;
