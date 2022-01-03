import { RefObject } from 'react';
import { Identifier } from 'react-dnd';

import { Todo, TodoTypes } from '@utils/types';

import { DragParams } from './Todo.types';

export interface TodoDnDParams {
    accept: TodoTypes;
    todoRef: RefObject<HTMLDivElement>;
    todo: Todo;
    onDrop: () => void;
    onDrag: (params: DragParams) => void;
}

export interface TodoDnDHook {
    handlerId: Identifier | null;
    isDragging: boolean;
}
