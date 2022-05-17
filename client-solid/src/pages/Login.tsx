import { Component, createSignal } from 'solid-js';
import axios from 'axios';
import ExternalPageWrapper from '../components/ExternalPageWrapper';
import { css } from 'solid-styled-components';
import { useNavigate } from 'solid-app-router';
import Typography from '@suid/material/Typography';
import TextField from '@suid/material/TextField';
import Button from '@suid/material/Button';

interface LoginForm {
    email: string;
    password: string;
}

const customStyles = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
`;

const Login: Component = () => {
    const [form, setForm] = createSignal<LoginForm>({ email: '', password: '' });
    const navigate = useNavigate();

    const handleLogin = () => {
        axios.post('/api/auth/login', form())
            .then(() => navigate('/', { replace: true }));
    };

    return (
        <ExternalPageWrapper className={customStyles}>
            <Typography variant="h1">Login</Typography>
            <TextField
                type='email'
                placeholder='Email'
                value={form().email}
                onChange={(e) => setForm(prev => ({ ...prev, email: e.currentTarget.value }))}
            />
            <TextField
                type='password'
                placeholder='Password'
                value={form().password}
                onChange={(e) => setForm(prev => ({ ...prev, password: e.currentTarget.value }))}
            />
            <Button
                onClick={handleLogin}
                fullWidth
            >
                Login
            </Button>
            <Button
                fullWidth
                href='http://localhost:5000/api/auth/google'
            >
                Google
            </Button>
        </ExternalPageWrapper>
    );
};

export default Login;
