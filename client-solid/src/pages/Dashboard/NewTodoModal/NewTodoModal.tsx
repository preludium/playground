import { Component, createSignal } from 'solid-js';
import TextField from '@suid/material/TextField';
import Typography from '@suid/material/Typography';
import Button from '@suid/material/Button';
import { mutateTodos, todos } from '../todos.resource';
import axios from '@utils/axios';
import { NewTodoRequest, Todo, TodoType } from '../todo.types';
import Modal from '@components/Modal';
import { setShowAddModal, showAddModal } from '../Dashboard.signals';

const NewTodoModal: Component = () => {
    const [name, setName] = createSignal('');

    const handleClose = () => {
        setShowAddModal(false);
        setName('');
    };

    const handleSubmit = () => {
        const newTodo: NewTodoRequest = {
            name: name(),
            order: todos().length,
            type: TodoType.TODO,
        };

        axios.post<Todo>('/api/todos', newTodo)
            .then((response) => {
                mutateTodos(() => [...todos(), response.data]);
                handleClose();
            });
    };

    return (
        <Modal
            show={showAddModal()}
            onClose={handleClose}
            sx={{ gap: '1rem'}}
            fullWidth
        >
            <Typography>Add TODO</Typography>
            <TextField
                type='name'
                placeholder='Name'
                value={name()}
                onChange={(e) => setName(e.currentTarget.value)}
            />
            <Button onClick={handleSubmit}>Add</Button>
        </Modal>
    );
};

export default NewTodoModal;
