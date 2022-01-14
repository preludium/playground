import {
    Button, Dialog, DialogActions, DialogContent,
    DialogContentText, DialogTitle, TextField, Typography,
} from '@mui/material';
import { AxiosError } from 'axios';
import type { VFC } from 'react';
import { useNavigate } from 'react-router';
import { useImmer } from 'use-immer';

import useAuthApi from '@api/Auth';
import ExternalPageTemplate from '@components/layout/ExternalPageTemplate';
import { Link } from '@components/Link';

import { RegisterErrorDialogState, RegisterFormState } from './Register.page.types';
import { initialRegisterErrorDialogState, initialRegisterFormState } from './Register.page.utils';

const RegisterPage: VFC = () => {
    const [ formState, setFormState ] = useImmer<RegisterFormState>(initialRegisterFormState);
    const [ error, setError ] = useImmer<RegisterErrorDialogState>(initialRegisterErrorDialogState);

    const { register } = useAuthApi();
    const navigate = useNavigate();

    const handleRegister = () => {
        register(formState)
            .then(() => {
                navigate('/login');
            })
            .catch((e: AxiosError) => {
                if (!e.response) return;
                setError({
                    open: true,
                    message: e.response.data,
                });
            });
    };

    const footer = (
        <Link to="/login">Already have an account? Log in</Link>
    );

    return (
        <>
            <ExternalPageTemplate
                title={'Register'}
                onButtonClick={handleRegister}
                footer={footer}
            >
                <TextField
                    value={formState.email}
                    onChange={event => setFormState(draft => {
                        draft.email = event.target.value.trim();
                    })}
                    label={'Email'}
                    name={'email'}
                    type={'email'}
                />
                <TextField
                    value={formState.password}
                    onChange={event => setFormState(draft => {
                        draft.password = event.target.value.trim();
                    })}
                    label={'Password'}
                    name={'password'}
                    type={'password'}
                />
                <TextField
                    value={formState.confirmPassword}
                    onChange={event => setFormState(draft => {
                        draft.confirmPassword = event.target.value.trim();
                    })}
                    label={'Confirm Password'}
                    name={'confirmPassword'}
                    type={'password'}
                />
            </ExternalPageTemplate>
            <Dialog
                open={error.open}
                onClose={() => setError(draft => {
                    draft.open = false;
                })}
                aria-labelledby="register-alert-title"
                aria-describedby="register-alert-description"
            >
                <DialogTitle id="register-alert-title">
                    Register Error
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="register-alert-description">
                        {error.message}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        autoFocus
                        onClick={() => setError(draft => {
                            draft.open = false;
                        })}
                    >
                        <Typography variant={'button'}>Close</Typography>
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default RegisterPage;
