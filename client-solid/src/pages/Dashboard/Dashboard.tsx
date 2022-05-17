import { Component, For } from 'solid-js';
import Add from '@suid/icons-material/Add'

import InternalPageWrapper from '@components/InternalPageWrapper';
import FloatingActionButton from '@components/FloatingActionButton';

import { Wrapper } from './Dashboard.styles';
import { TodoType } from './todo.types';
import NewTodoModal from './NewTodoModal';
import DeleteTodoModal from './DeleteTodoModal';
import DndColumn from './DndColumn/DndColumn';
import { setShowAddModal } from './Dashboard.signals';
import { DragDropProvider, DragDropSensors } from '@thisbeyond/solid-dnd';

const TYPES = Object.values(TodoType);

const Dashboard: Component = () => {
    return (
        <>
            <DragDropProvider
                onDragStart={onDragStart}
                onDragOver={onDragOver}
                onDragEnd={onDragEnd}
                collisionDetector={closestContainerOrItem}
            >
                <DragDropSensors />
                <InternalPageWrapper>
                    <Wrapper>
                    <For each={TYPES}>
                        {(type) => <DndColumn type={type} />}
                    </For>
                    </Wrapper>
                </InternalPageWrapper>
            </DragDropProvider>
            <FloatingActionButton
                onClick={() => setShowAddModal(true)}
            >
                <Add />
            </FloatingActionButton>
            <NewTodoModal />
            <DeleteTodoModal />
        </>
    );
};

export default Dashboard;