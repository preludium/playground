import { createSortable } from '@thisbeyond/solid-dnd';
import { Component } from 'solid-js';
import { Todo, TodoTile } from '..';
import { setDeleteModalState } from '../Dashboard.signals';

interface Props {
    todo: Todo;
}

const DndTile: Component<Props> = (props) => {
    const sortable = createSortable(props.todo.id);

    return (
        <TodoTile
            use:sortable
            onDblClick={() => setDeleteModalState({ show: true, todo: props.todo })}
        >
            {props.todo.name}
        </TodoTile>
    );
}

export default DndTile;
