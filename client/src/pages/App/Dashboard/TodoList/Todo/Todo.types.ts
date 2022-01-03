import { Todo, TodoDnD, TodoTypes } from '@utils/types';

export interface DragParams {
    drag: TodoDnD;
    hover: TodoDnD;
}

export interface TodoProps {
    todo: Todo;
    onDrop: () => void;
    onDrag: (params: DragParams) => void;
    accept: TodoTypes;
}
