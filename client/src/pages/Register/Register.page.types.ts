import { LoginFormState } from '../Login';

export interface RegisterFormState extends LoginFormState {
    confirmPassword: string;
}

export interface RegisterErrorDialogState {
    open: boolean;
    message: string;
}
