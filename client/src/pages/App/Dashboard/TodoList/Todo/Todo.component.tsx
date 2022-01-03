import { Typography } from '@mui/material';

import { FunctionComponent, useRef } from 'react';

import { Item } from '@pages/App/Dashboard';

import { TodoProps } from './Todo.types';
import useTodoDnD from './useTodoDnD';

const TodoComponent: FunctionComponent<TodoProps> = ({ todo, onDrag, onDrop, accept }) => {
    const todoRef = useRef<HTMLDivElement>(null);
    const { isDragging, handlerId } = useTodoDnD({ todoRef, todo, onDrop, onDrag, accept });

    return (
        <Item ref={todoRef}
            data-handler-id={handlerId}
            isDragging={isDragging}
        >
            <Typography variant={'h6'}>{todo.name}</Typography>
        </Item>
    );
};

export default TodoComponent;
