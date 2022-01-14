import { Button, Modal, TextField, Typography } from '@mui/material';
import { ChangeEvent, useEffect, useState, VFC } from 'react';
import { useMutation, useQueryClient } from 'react-query';

import useTodoApi, { CreateTodo } from '@api/Todo';
import { TodoTypes } from '@utils/types';

import { Wrapper } from './AddTodoModal.styles';

interface AddTodoProps {
    show: boolean;
    onClose: () => void;
    lastTodoOrder: number;
}

const AddTodoModal: VFC<AddTodoProps> = ({ show, onClose, lastTodoOrder }) => {
    const [ name, setName ] = useState('');
    const [ showError, setShowError ] = useState(false);

    const { create } = useTodoApi();
    const queryClient = useQueryClient();
    const { mutate } = useMutation(create, {
        onSuccess: () => {
            queryClient.invalidateQueries('todos');
        },
    });

    useEffect(() => {
        if (!show) return;
        setName('');
        setShowError(false);
    }, [show]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value.trim());
    };

    const handleAdd = () => {
        if (!name) {
            setShowError(true);
            return;
        }
        const todo: CreateTodo = {
            name,
            type: TodoTypes.TODO,
            order: lastTodoOrder + 1,
        };
        mutate(todo);
        onClose();
    };

    return (
        <Modal open={show} onClose={onClose}>
            <Wrapper>
                <Typography variant="h2">Add Todo</Typography>
                <TextField
                    autoFocus
                    label="Name"
                    onChange={handleChange}
                    value={name}
                    name={'todo-name'}
                    error={showError}
                    helperText={showError ? 'Name cannot be empty' : ''}
                    onKeyPress={event => {
                        if (event.key === 'Enter') handleAdd();
                    }}
                />
                <Button onClick={handleAdd} variant={'contained'}>Add</Button>
            </Wrapper>
        </Modal>
    );
};

export default AddTodoModal;
