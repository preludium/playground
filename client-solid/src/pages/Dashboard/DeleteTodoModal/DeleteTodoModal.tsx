import { Component } from 'solid-js';
import Typography from '@suid/material/Typography';
import Button from '@suid/material/Button';
import { mutateTodos, todos } from '../todos.resource';
import axios from '@utils/axios';
import Modal from '@components/Modal';
import { deleteModalState, setDeleteModalState } from '../Dashboard.signals';

const DeleteTodoModal: Component = () => {
    const handleClose = () => {
        setDeleteModalState({ show: false });
    };

    const handleSubmit = () => {
        axios.delete<void>('/api/todos/' + deleteModalState().todo?.id)
            .then(() => {
                mutateTodos(() => todos().filter((todo) => todo.id !== deleteModalState().todo?.id));
                handleClose();
            });
    };

    return (
        <Modal
            show={deleteModalState().show && !!deleteModalState().todo}
            onClose={handleClose}
            sx={{ gap: '1rem' }}
        >
            <Typography>Delete TODO</Typography>
            <Typography>Are you sure you want to delete {deleteModalState().todo?.name}?</Typography>
            <Button onClick={handleSubmit}>Delete</Button>
        </Modal>
    );
};

export default DeleteTodoModal;
