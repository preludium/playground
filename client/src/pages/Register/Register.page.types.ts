import { LoginFormState } from '../Login';

export interface RegisterFormState extends LoginFormState {
    confirmPassword: string;
}
