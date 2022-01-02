import { useNavigate } from 'react-router';

import { LoginFormState } from '@pages/Login';
import { RegisterFormState } from '@pages/Register';
import axios, { AxiosResponse } from '@utils/axios';

interface AuthApiHook {
    login: (data: LoginFormState) => Promise<AxiosResponse<void>>;
    logout: () => Promise<void>;
    register: (data: RegisterFormState) => Promise<AxiosResponse<void>>;
    refreshToken: () => Promise<AxiosResponse<void>>;
}

const useAuthApi = (): AuthApiHook => {
    const navigate = useNavigate();

    const login = (data: LoginFormState) => axios
        .post<void>('/api/auth/login', data);

    const logout = () => axios.delete<void>('/api/auth/logout')
        .then(() => {
            navigate('/login');
        });

    const register = (data: RegisterFormState) => axios
        .post<void>('/api/auth/register', data);

    const refreshToken = () => axios
        .get<void>('/api/auth/refresh-token');

    return {
        login,
        logout,
        register,
        refreshToken,
    };
};

export default useAuthApi;
