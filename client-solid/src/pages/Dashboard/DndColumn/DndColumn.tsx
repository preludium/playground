import Typography from '@suid/material/Typography';
import { createSortable, SortableProvider } from '@thisbeyond/solid-dnd';
import { Component, For } from 'solid-js';
import { Section, TodoListContainer, todos, TodoType } from '..';
import DndTile from '../DndTile/DndTile';

interface Props {
    type: TodoType;
}

const todosByType = (type: TodoType) => todos().filter((todo) => todo.type === type);

const DndColumn: Component<Props> = (props) => {
    const sortable = createSortable(props.type);
    const filteredTodos = () => todosByType(props.type);

    return (
        <Section ref={sortable.ref}>
            <Typography variant="h5">{props.type.replace('_', ' ')}</Typography>
            <TodoListContainer>
                <SortableProvider ids={filteredTodos().map<string>((todo) => todo.id)}>
                    <For each={filteredTodos()}>
                        {(todo) => <DndTile todo={todo} />}
                    </For>
                </SortableProvider>
            </TodoListContainer>
        </Section>
    );
};

export default DndColumn;
