import Axios, { AxiosRequestConfig, AxiosResponse as Response } from 'axios';

import httpStatus from '@utils/types/httpStatus';

export interface AxiosOptions {
    noInterceptors?: boolean;
    noUnauthorizedInterceptor?: boolean;
    noForbiddenInterceptor?: boolean;
    noInternalServerErrorInterceptor?: boolean;
}

const handleUnauthorized = async (originalRequest: AxiosRequestConfig) => {
    return await axios.get('/api/auth/refresh-token')
        .then(() => {
            axios(originalRequest);
        })
        .catch((error) => {
            window.location.replace('/login');
            return Promise.reject(error);
        });
};

const handleForbidden = () => {
    window.location.replace('/403');
};

const handleServerError = () => {
    window.location.replace('/500');
};

export const createAxios = (options?: AxiosOptions) => {
    const axios = Axios.create();

    const successResponseInterceptor = (
        response: Response,
    ): Response | Promise<Response> => {
        return response;
    };

    // eslint-disable-next-line
    const errorResponseInterceptor = (error: any): Promise<unknown> => {
        const originalRequest = error.config;
        const httpCode = error.response.status;

        if (!options?.noUnauthorizedInterceptor && httpCode === httpStatus.unauthorized.code) {
            return handleUnauthorized(originalRequest);
        }

        if (!options?.noForbiddenInterceptor && httpCode === httpStatus.forbidden.code) {
            handleForbidden();
        } else if (!options?.noInternalServerErrorInterceptor && httpCode === httpStatus.internalServerError.code) {
            handleServerError();
        }
        return Promise.reject(error);
    };

    axios.interceptors.response.use(
        successResponseInterceptor,
        errorResponseInterceptor,
    );

    return axios;
};

const axios = createAxios();

// eslint-disable-next-line no-duplicate-imports
export { AxiosResponse } from 'axios';

export default axios;
