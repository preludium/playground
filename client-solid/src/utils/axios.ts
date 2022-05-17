import Axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

enum HttpStatus {
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    INTERNAL_SERVER_ERROR = 500,
}

const handleUnauthorized = async (originalRequest: AxiosRequestConfig) => {
    return await axios.get('/api/auth/refresh-token')
        .then(() => axios(originalRequest))
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

const createAxios = () => {
    const axios = Axios.create();

    const successResponseInterceptor = (response: AxiosResponse<any, any>) => response;

    const errorResponseInterceptor = (error: any): Promise<unknown> => {
        const originalRequest = error.config;
        const httpCode = error.response.status;

        if (httpCode === HttpStatus.UNAUTHORIZED) {
            return handleUnauthorized(originalRequest);
        }

        if (httpCode === HttpStatus.FORBIDDEN) {
            handleForbidden();
        } else if (httpCode === HttpStatus.INTERNAL_SERVER_ERROR) {
            handleServerError();
        }
        return Promise.reject(error);
    };

    axios.interceptors.response.use(
        successResponseInterceptor,
        errorResponseInterceptor,
    );

    return axios;
}

const axios = createAxios();

export default axios;