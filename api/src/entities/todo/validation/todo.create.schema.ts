import * as yup from 'yup';
import { TodoTypes } from '../todo.types';

export const todoCreateSchema = yup.object().shape({
    name: yup.string().required(),
    type: yup.array(
        yup.mixed<TodoTypes>()
            .oneOf(Object.values(TodoTypes), 'Wrong type format'))
});