import TodoModel, { Todo, TodoRequest } from '@entities/todo';
import { wrongId } from '@utils/constants';
import Logger from '@utils/logger';
import { MongoDeleteResult } from '@utils/types/mongo';

class TodoService {
    private todos = TodoModel;
    private logger = Logger.create(__filename);
    
    public getByUserId(userId: string): Promise<Todo[]> {
        return this.todos.find({ userId }).exec();
    }

    public create(todo: TodoRequest, userId: string): Promise<Todo> {
        return this.todos.create({
            ...todo,
            userId
        });
    }

    public update(todo: TodoRequest, userId: string, todoId: string): Promise<Todo> {
        return this.todos.findOneAndUpdate({ _id: todoId }, {
            ...todo,
            userId: userId
        }, { new: true })
            .then(updatedTodo => {
                if (!updatedTodo) {
                    this.logger.error('ID of updated todo is null');
                    throw new Error(wrongId);
                }
                return updatedTodo;
            })
            .catch(error => {
                if (error.codeName) {
                    throw new Error(error.codeName);
                }
                throw new Error(error.message);
            });
    }
    
    public async updateAll(todos: Todo[]) {
        // const session = await mongoose.startSession()
        // session.startTransaction();
        return await Promise.all(todos.map(({ id, ...rest}) =>
            this.todos.updateOne({ _id: id }, rest)
        ));
        // return this.todos.updateOne({}, { "$set": todos }, { multi: true })
        //     .then(async (result) => {
                // await session.commitTransaction();
                // session.endSession();
                // return result;
            // })
            // .catch(async (error) => {
                // await session.abortTransaction();
                // session.endSession();
                // throw new Error(error);
            // });
    }

    public delete(todoId: string): Promise<MongoDeleteResult> {
        return this.todos.deleteOne({ _id: todoId }).exec();
    }
}

export default TodoService;
