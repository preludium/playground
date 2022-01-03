import { FunctionComponent, useRef } from 'react';

import { Todo, TodoTypes } from '@utils/types';

import { Column, Title } from '../Dashboard.styles';
import TodoList from '../TodoList';
import useTodoContainerDnD from './useTodoContainerDnD';

interface TodoContainerProps {
    todos: Todo[];
    type: TodoTypes;
    onDrop: (todo: Todo, type: TodoTypes) => void;
}

const TodoContainer: FunctionComponent<TodoContainerProps> = ({ type, todos, onDrop }) => {
    const containerRef = useRef<HTMLDivElement>(null);

    const { handlerId } = useTodoContainerDnD({ type, containerRef, onDrop });

    const getTitle = () => type.replace('_', ' ');

    return (
        <Column ref={containerRef} data-handler-id={handlerId}>
            <Title>{getTitle()}</Title>
            <TodoList todos={todos} type={type} />
        </Column>
    );
};

export default TodoContainer;
