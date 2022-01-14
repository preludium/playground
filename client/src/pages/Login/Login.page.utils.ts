import { LoginFormState, LoginErrorDialogState } from './Login.page.types';

export const initialFormState: LoginFormState = {
    email: '',
    password: '',
};

export const initialLoginErrorDialogState: LoginErrorDialogState = {
    open: false,
    message: '',
};
