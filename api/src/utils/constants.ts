import * as yup from 'yup';

export const paramMissingError = 'One or more of the required parameters was missing.';

export const wrongId = 'Wrong id';

export enum Role {
    USER = 'USER',
    ADMIN = 'ADMIN'
}
