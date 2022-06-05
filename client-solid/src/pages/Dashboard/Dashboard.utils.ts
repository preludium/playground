import { todos, TodoType } from '.';

export const TYPES = Object.keys(TodoType);

export const isContainer = (id: string | number) => TYPES.includes(id as string);
