import {
    Button, Dialog, DialogActions, DialogContent,
    DialogContentText, DialogTitle, TextField, Typography,
} from '@mui/material';
import type { AxiosError } from 'axios';
import type { VFC } from 'react';
import { useNavigate } from 'react-router';
import { useImmer } from 'use-immer';

import useAuthApi from '@api/Auth';
import ExternalPageTemplate from '@components/layout/ExternalPageTemplate';
import { Link } from '@components/Link';

import { LoginFormState, LoginErrorDialogState } from './Login.page.types';
import { initialFormState, initialLoginErrorDialogState } from './Login.page.utils';

const LoginPage: VFC = () => {
    const [ formState, setFormState ] = useImmer<LoginFormState>(initialFormState);
    const [ error, setError ] = useImmer<LoginErrorDialogState>(initialLoginErrorDialogState);

    const { login } = useAuthApi();
    const navigate = useNavigate();

    const handleLogin = () => {
        login(formState)
            .then(() => {
                navigate('/');
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
        <Link to="/register">Don't have an account? Sign up</Link>
    );

    return (
        <>
            <ExternalPageTemplate
                title={'Login'}
                onButtonClick={handleLogin}
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
            </ExternalPageTemplate>
            <Dialog
                open={error.open}
                onClose={() => setError(draft => {
                    draft.open = false;
                })}
                aria-labelledby="login-alert-title"
                aria-describedby="login-alert-description"
            >
                <DialogTitle id="login-alert-title">
                    Login Error
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="login-alert-description">
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

export default LoginPage;
