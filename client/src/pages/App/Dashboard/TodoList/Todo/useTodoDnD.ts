import {
    DragSourceMonitor,
    DropTargetMonitor,
    useDrag,
    useDrop,
    XYCoord,
} from 'react-dnd';

import { Todo, TodoDnD } from '@utils/types';

import { TodoDnDHook, TodoDnDParams } from './useTodoDnD.types';

const useTodoDnD = ({
    todo, todoRef, onDrop, onDrag, accept,
}: TodoDnDParams): TodoDnDHook => {
    const [ { handlerId }, drop ] = useDrop({
        accept,
        collect: (monitor: DropTargetMonitor) => ({ handlerId: monitor.getHandlerId() }),
        // eslint-disable-next-line complexity
        hover: (item: Todo, monitor: DropTargetMonitor) => {
            if (!todoRef.current) return;

            const dragIndex = item.order;
            const hoverIndex = todo.order;

            if (dragIndex === hoverIndex) return;

            const hoverBoundingRect = todoRef.current?.getBoundingClientRect();

            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

            const clientOffset = monitor.getClientOffset();

            const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return;

            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return;

            onDrag({
                drag: item,
                hover: todo,
            });

            item.order = hoverIndex;
        },
        drop: () => {
            if (!todoRef.current) return;
            onDrop();
        },
    });

    const [ { isDragging }, drag ] = useDrag({
        type: accept,
        item: (): TodoDnD => ({ id: todo?.id, order: todo.order, type: todo.type }),
        collect: (monitor: DragSourceMonitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    drag(drop(todoRef));

    return { handlerId, isDragging };
};

export default useTodoDnD;
