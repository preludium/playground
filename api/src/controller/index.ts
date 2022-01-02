import { Controller } from '@utils/types/controller';
import TodoController from './todo/todo.controller';

import UserController from './user';

const controllers: Controller[] = [
    new UserController(),
    new TodoController()
];

export default controllers;
