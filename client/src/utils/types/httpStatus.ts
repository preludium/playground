export type HttpStatus = 'unauthorized' | 'forbidden' | 'internalServerError';

export interface HttpStatusBody {
    code: number;
    message: string;
}

const httpStatus: Record<HttpStatus, HttpStatusBody> = {
    unauthorized: {
        code: 401,
        message: 'Unauthorized',
    },
    forbidden: {
        code: 403,
        message: 'Access denied',
    },
    internalServerError: {
        code: 500,
        message: 'Internal server error',
    },
};

export default httpStatus;
