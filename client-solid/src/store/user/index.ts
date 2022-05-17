import { createResource } from 'solid-js';
import axios from 'utils/axios';
import { User } from './state';

const createUserResource = () => {
    const [user, { mutate, refetch }] = createResource<User | null>(
        () => axios.get('/api/users-current').then(res => res.data),
        { initialValue: null }
    );

    return { user, mutateUser: mutate, refetchUser: refetch };
};

export const { user, mutateUser, refetchUser } = createUserResource();