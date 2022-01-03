import { FunctionComponent, useCallback, useEffect } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { useImmer } from 'use-immer';

import useTodoApi from '@api/Todo';
import { Todo, TodoTypes } from '@utils/types';

import TodoComponent, { DragParams } from './Todo';

interface TodoListProps {
    todos: Todo[];
    type: TodoTypes;
}

const TodoList: FunctionComponent<TodoListProps> = (props) => {
    const [ todos, setTodos ] = useImmer<Todo[]>([]);
    const { updateAll } = useTodoApi();
    const queryClient = useQueryClient();
    const { mutate } = useMutation(updateAll, {
        onSuccess: () => {
            queryClient.invalidateQueries('todos');
        },
    });

    useEffect(() => {
        setTodos(props.todos);
    }, [props.todos]);

    const handleDrag = useCallback(({ drag, hover }: DragParams) => {
        setTodos(draft => {
            const dragTodo = draft.find(todo => todo.id === drag.id);
            const hoverTodo = draft.find(todo => todo.id === hover.id);
            if (dragTodo && hoverTodo) {
                const tmp = dragTodo?.order;
                dragTodo.order = hoverTodo.order;
                hoverTodo.order = tmp;
            }
        });
    }, [todos]);

    const handleDrop = useCallback(() => {
        const todosToUpdate = todos.reduce<Todo[]>((acc, todo) => {
            const initialTodo = props.todos.find(propsTodo => propsTodo.id === todo.id);
            if (!initialTodo) return acc;
            return initialTodo.order === todo.order ? acc : [ ...acc, todo ];
        }, []);
        if (!todosToUpdate.length) return;
        mutate(todosToUpdate);
    }, [ todos, props.todos ]);

    return (
        <>
            {todos
                .slice()
                .sort((itemA, itemB) => itemA.order - itemB.order)
                .map(todo => (
                    <TodoComponent key={todo.id}
                        todo={todo}
                        onDrag={handleDrag}
                        onDrop={handleDrop}
                        accept={props.type}
                    />
                ))}
        </>
    );
};

export default TodoList;
