import * as yup from 'yup';

import { Role } from '@utils/constants';
import { passwordValidator } from '@utils/validators';

export const updateUserSchema = yup.object().shape({
    email: yup.string()
        .email('Not a valid email'),
    ...passwordValidator(),
    roles: yup.array(
        yup.mixed<Role>()
            .oneOf(Object.values(Role), 'Wrong roles format')
    )
});
