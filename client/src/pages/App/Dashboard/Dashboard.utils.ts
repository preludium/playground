import { Todo, TodoTypes } from '@utils/types';

const mapIntoTodoMapElement = (originalData: Todo[], type: TodoTypes) => {
    const data = originalData.filter(item => item.type === type);
    const lastOrder = data.reduce<number>((acc, todo) => acc < todo.order ? todo.order : acc, 1);
    return { data, lastOrder };
};

export const mapTodosIntoMap = (data: Todo[]) => {
    return {
        [TodoTypes.TODO]: mapIntoTodoMapElement(data, TodoTypes.TODO),
        [TodoTypes.IN_PROGRESS]: mapIntoTodoMapElement(data, TodoTypes.IN_PROGRESS),
        [TodoTypes.DONE]: mapIntoTodoMapElement(data, TodoTypes.DONE),
    };
};
