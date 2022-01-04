import AddIcon from '@mui/icons-material/Add';

import { FunctionComponent, useEffect, useMemo } from 'react';

import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useImmer } from 'use-immer';

import useTodoApi from '@api/Todo';
import { Todo, TodoDnD, TodoTypes } from '@utils/types';

import { StyledFab, Wrapper } from './Dashboard.styles';
import { TodoMap } from './Dashboard.types';
import { mapTodosIntoMap } from './Dashboard.utils';
import TodoContainer from './TodoContainer';

const getKey = (type: string) => `${type.toLowerCase().replace('_', '-')}-column`;

const Dashboard: FunctionComponent = () => {
    const { getAll, updateAll } = useTodoApi();
    const { data } = useQuery('todos', getAll);
    const queryClient = useQueryClient();
    const { mutate } = useMutation(updateAll, {
        onSuccess: () => {
            queryClient.invalidateQueries('todos');
        },
    });
    const [ todos, setTodos ] = useImmer<Todo[]>([]);

    useEffect(() => {
        if (!data) return;
        setTodos(data);
    }, [data]);

    const todosMap = useMemo<TodoMap>(() => mapTodosIntoMap(todos), [todos]);

    const handleDrop = (dropTodo: TodoDnD, type: TodoTypes) => {
        const todosToUpdate = todosMap[dropTodo.type].data.reduce<(Todo | TodoDnD)[]>((acc, todo) => {
            if (todo.order > dropTodo.order) {
                return [ ...acc, { ...todo, order: todo.order - 1 } ];
            }
            if (todo.id === dropTodo.id) {
                return [ ...acc, { ...dropTodo, type, order: todosMap[type].lastOrder + 1 } ];
            }
            return acc;
        }, []);
        if (!todosToUpdate.length) return;
        mutate(todosToUpdate);
        setTodos(draft => {
            const wantedTodo = draft.find(todo => todo.id === dropTodo.id);
            if (!wantedTodo) return;
            wantedTodo.type = type;
            wantedTodo.order = todosMap[type].lastOrder + 1;
        });
    };

    const renderTodos = () => Object.values(TodoTypes)
        .map(type => (
            <TodoContainer key={getKey(type)}
                type={type}
                todos={todosMap[type].data}
                onDrop={handleDrop}
            />
        ));

    return (
        <Wrapper>
            {renderTodos()}
            <StyledFab color="primary" aria-label="add">
                <AddIcon />
            </StyledFab>
        </Wrapper>
    );
};

export default Dashboard;
