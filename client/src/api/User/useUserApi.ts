import { unwrapResult } from '@reduxjs/toolkit';

import { useAppDispatch } from '@hooks/redux';
import { sessionActions } from '@redux/Session';
import axios, { AxiosResponse } from '@utils/axios';
import { User } from '@utils/types';

interface UserApiHook {
    fetchCurrent: () => Promise<User>;
    get: (userId: string) => Promise<AxiosResponse<User>>;
    getAll: () => Promise<AxiosResponse<User[]>>;
    update: (userId: string) => Promise<AxiosResponse<User>>;
}

const useUserApi = (): UserApiHook => {
    const dispatch = useAppDispatch();

    const fetchCurrent = (): Promise<User> => dispatch(sessionActions.getCurrentAccountDataIfNeeded())
        .then(unwrapResult);

    const getAll = () => axios
        .get<User[]>('/api/users');

    const get = (userId: string) => axios
        .get<User>(`/api/users/${userId}`);

    const update = (userId: string) => axios
        .put<User>(`/api/users/${userId}`);

    return {
        fetchCurrent,
        get,
        getAll,
        update,
    };
};

export default useUserApi;
