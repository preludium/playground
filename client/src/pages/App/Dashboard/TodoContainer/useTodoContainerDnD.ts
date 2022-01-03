import { RefObject } from 'react';
import { DropTargetMonitor, useDrop } from 'react-dnd';

import { Todo, TodoTypes } from '@utils/types';

interface TodoContainerDnD {
    containerRef: RefObject<HTMLDivElement>;
    onDrop: (todo: Todo, type: TodoTypes) => void;
    onDrag?: () => void;
    type: TodoTypes;
}
const getAccept = (type: TodoTypes) => {
    if (type === TodoTypes.TODO) return TodoTypes.IN_PROGRESS;
    if (type === TodoTypes.IN_PROGRESS) return [ TodoTypes.TODO, TodoTypes.DONE ];
    return TodoTypes.IN_PROGRESS;
};

const useTodoContainerDnD = ({
    containerRef, onDrop, onDrag, type,
}: TodoContainerDnD) => {
    const [ { handlerId }, drop ] = useDrop({
        accept: getAccept(type),
        collect: (monitor: DropTargetMonitor) => ({ handlerId: monitor.getHandlerId() }),
        hover: () => {
            if (!containerRef.current) return;
            onDrag?.();
        },
        drop: (todo: Todo) => {
            if (!containerRef.current) return;
            onDrop(todo, type);
        },
    });

    drop(containerRef);

    return { handlerId };
};

export default useTodoContainerDnD;
