import { Component, createSignal, For, batch } from 'solid-js';
import Add from '@suid/icons-material/Add'
import {
    closestCenter,
    CollisionDetector,
    DragDropProvider, DragDropSensors, DragEventHandler, Draggable, Droppable,
} from '@thisbeyond/solid-dnd';

import InternalPageWrapper from '@components/InternalPageWrapper';
import FloatingActionButton from '@components/FloatingActionButton';

import { Wrapper } from './Dashboard.styles';
import NewTodoModal from './NewTodoModal';
import DeleteTodoModal from './DeleteTodoModal';
import DndColumn from './DndColumn/DndColumn';
import { setShowAddModal } from './Dashboard.signals';
import { containers, setContainers } from './todos.resource';
import { isContainer, Todo, TodoType, TYPES } from '.';

const getContainer = (id: string | number) => {
    for (const [key, todos] of Object.entries(containers)) {
        if (todos.some((todo) => todo.id === id)) {
            return key;
        }
    }
};

const Dashboard: Component = () => {
    const [activeItem, setActiveItem] = createSignal<string | null>(null);
    
    const onDragStart: DragEventHandler = ({ draggable }) => setActiveItem(draggable.id as string);

    const onDragOver: DragEventHandler = ({ draggable, droppable }) => {
        if (draggable && droppable) {
            move(draggable, droppable);
        }
    };
    
    const onDragEnd: DragEventHandler = ({ draggable, droppable }) => {
        if (draggable && droppable) {
            move(draggable, droppable, false);
        }
        setActiveItem(null);
    };

    const closestContainerOrItem: CollisionDetector = (draggable, droppables, context) => {
        const closestContainer = closestCenter(
          draggable,
          droppables.filter((droppable) => isContainer(droppable.id)),
          context
        );

        if (closestContainer) {
            const containerTodos = containers[closestContainer.id as TodoType];
            const closestItem = closestCenter(
                draggable,
                droppables.filter((droppable) => containerTodos.some((todo) => todo.id === droppable.id)),
                context
            );

            if (!closestItem) {
                return closestContainer;
            }
        
            if (getContainer(draggable.id) !== closestContainer.id) {
                const isLastItem = containerTodos.findIndex((todo) => todo.id === closestItem.id) === containerTodos.length - 1;
        
                if (isLastItem) {
                    const belowLastItem = draggable.transformed.center.y > closestItem.transformed.center.y;
        
                    if (belowLastItem) {
                        return closestContainer;
                    }
                }
            }

            return closestItem;
        }

        return null;
    };
    
    const move = (draggable: Draggable, droppable: Droppable, onlyWhenChangingContainer = true) => {
        const draggableContainer = getContainer(draggable.id);
        const droppableContainer = isContainer(droppable.id)
            ? droppable.id
            : getContainer(droppable.id);
    
        if (draggableContainer != droppableContainer || !onlyWhenChangingContainer) {
            const containerTodos = containers[droppableContainer as TodoType];
            let index = containerTodos.findIndex((todo) => todo.id === droppable.id);
            if (index === -1) index = containerTodos.length;
    
            batch(() => {
                setContainers(draggableContainer as TodoType, (items) =>
                    items.filter((item) => item.id !== draggable.id)
                );
                setContainers(droppableContainer as TodoType, (items) => [
                    ...items.slice(0, index),
                    draggable.data as Todo,
                    ...items.slice(index),
                ]);
            });
        }
    };

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
                        {(type) => <DndColumn type={type as TodoType} />}
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