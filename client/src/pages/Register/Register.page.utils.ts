import { RegisterErrorDialogState, RegisterFormState } from './Register.page.types';

export const initialRegisterFormState: RegisterFormState = {
    email: '',
    password: '',
    confirmPassword: '',
};

export const initialRegisterErrorDialogState: RegisterErrorDialogState = {
    open: false,
    message: '',
};
