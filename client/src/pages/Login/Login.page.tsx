import { Button, TextField, Typography } from '@mui/material';
import { FunctionComponent, useState } from 'react';
import { useNavigate } from 'react-router';

import useAuthApi from '@api/Auth';

import { ButtonWrapper, ContentWrapper, LoginForm, Title } from './Login.page.styles';
import { LoginFormState } from './Login.page.types';
import { initialFormState } from './Login.page.utils';

const LoginPage: FunctionComponent = () => {
    const [ formState, setFormState ] = useState<LoginFormState>(initialFormState);
    const { login } = useAuthApi();
    const navigate = useNavigate();

    const handleLogin = () => {
        login(formState)
            .then(() => {
                navigate('/');
            });
    };

    return (
        <ContentWrapper>
            <Title variant={'h3'}>Login</Title>
            <LoginForm>
                <TextField
                    value={formState.email}
                    onChange={event => setFormState(prevState => ({ ...prevState, email: event.target.value.trim() }))}
                    label={'Email'}
                    name={'email'}
                    type={'email'}
                />
                <TextField
                    value={formState.password}
                    onChange={event => setFormState(prevState => ({
                        ...prevState, password: event.target.value.trim(),
                    }))}
                    label={'Password'}
                    name={'password'}
                    type={'password'}
                />
            </LoginForm>
            <ButtonWrapper>
                <Button onClick={handleLogin} fullWidth variant={'contained'}>
                    <Typography variant={'button'}>Login</Typography>
                </Button>
            </ButtonWrapper>
        </ContentWrapper>
    );
};

export default LoginPage;
