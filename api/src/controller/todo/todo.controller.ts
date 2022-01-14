import { TodoResponse } from '@entities/todo';
import { todoCreateSchema } from '@entities/todo/validation';
import TodoService from '@service/todo';
import { wrongId } from '@utils/constants';
import HttpException from '@utils/exceptions/http.exception';
import { isMongoId } from '@utils/functions';
import Logger from '@utils/logger';
import { validateRequestMiddleware } from '@utils/middlewares';
import { ApiResponse, Controller } from '@utils/types/controller';
import { NextFunction, Router } from 'express';
import StatusCodes from 'http-status-codes';
import {
    CreateTodoRequest,
    DeleteTodoRequest,
    UpdateAllTodoRequest,
    UpdateTodoRequest
} from './types';

class TodoController implements Controller {
    readonly path = '/todos';
    readonly router = Router();
    private logger = Logger.create(__filename);
    private todoService = new TodoService();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(
            `${this.path}-current`,
            this.getTodosOfCurrentUser.bind(this)
        );
        
        this.router.post(
            this.path,
            validateRequestMiddleware(todoCreateSchema),
            this.createTodo.bind(this)
        )
        
        this.router.delete(
            `${this.path}/:todoId`,
            this.deleteTodo.bind(this)
        )
        
        this.router.put(
            `${this.path}/:todoId`,
            //TODO validation
            this.updateTodo.bind(this)
        )
        
        this.router.put(
            `${this.path}`,
            this.updateAll.bind(this)
        )
    }
    
    private getTodosOfCurrentUser(_, res: ApiResponse<TodoResponse[]>, next: NextFunction) {
        const user = res.locals.user;
        this.logger.info(`==> Trying to get todos of ${user.email}`);
        
        this.todoService.getByUserId(user._id)
            .then(todos => {
                this.logger.info(`<== Success: Sending ${todos.length} todos`);
                res.json(todos).end();
            })
            .catch(error => {
                next(new HttpException(StatusCodes.BAD_REQUEST, error.message));
            });
    }
    
    private createTodo(req: CreateTodoRequest, res: ApiResponse<TodoResponse>, next: NextFunction) {
        const user = res.locals.user;
        const todo = req.body;
        this.logger.info(`==> Trying to create new ${todo.type} todo by ${user.email}`);
        
        this.todoService.create(todo, user._id)
            .then(todo => {
                res.json(todo).end();
            })
            .catch(error => {
                next(new HttpException(StatusCodes.BAD_REQUEST, error.message));
            });
    }
    
    private async deleteTodo(req: DeleteTodoRequest, res: ApiResponse, next: NextFunction) {
        const user = res.locals.user;
        const todoId = req.params.todoId;
        this.logger.info(`==> Trying to delete ${todoId} todo by ${user.email}`);

        if (!isMongoId(todoId)) {
            return next(new HttpException(StatusCodes.BAD_REQUEST, wrongId));
        }

        const { deletedCount } = await this.todoService.delete(todoId)
        
        if (deletedCount === 0) {
            this.logger.error('<== Failure: no todo was deleted');
            return next(new HttpException(StatusCodes.NOT_FOUND, wrongId));
        }

        this.logger.info(`<== Success: todo ${todoId} deleted`);
        res.end();
    }
    
    private updateTodo(req: UpdateTodoRequest, res: ApiResponse<TodoResponse>, next: NextFunction) {
        const user = res.locals.user;
        const todoId = req.params.todoId;
        const todo = req.body;

        this.logger.info(`==> Trying to update ${todoId} todo by ${user.email}`);

        if (!isMongoId(todoId)) {
            return next(new HttpException(StatusCodes.BAD_REQUEST, wrongId));
        }
        
        this.todoService.update(todo, user._id, todoId)
            .then(updatedTodo => {
                this.logger.info(`<== Success: todo ${updatedTodo._id} updated`);
                res.json(updatedTodo).end();
            })
            .catch(error => {
                next(new HttpException(StatusCodes.BAD_REQUEST, error.message));
            });
    }
    
    private updateAll(req: UpdateAllTodoRequest, res: ApiResponse, next: NextFunction) {
        const user = res.locals.user;
        const todos = req.body;
        this.logger.info(`==> Trying to update ${todos.length} todos by ${user.email}`);
        return this.todoService.updateAll(req.body)
            .then(() => {
                this.logger.info('<== Success: all todos updated');
                res.end();
            })
            .catch((error) => {
                next(new HttpException(StatusCodes.BAD_REQUEST, error.message));
            });
    }

}

export default TodoController;
