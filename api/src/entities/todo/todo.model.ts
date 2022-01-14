import { Model, model, Schema } from 'mongoose';

import { Todo, TodoTypes } from './todo.types';

const todoSchema: Schema<Todo> = new Schema({
    name: {
        type: String,
        required: true,
    },
    userId: {
        type: String,
        required: true
    },
    order: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        enum: TodoTypes,
        required: true
    }
}, {
    timestamps: true,
    versionKey: false
});

todoSchema.set('toJSON', {
    transform: (_, returnObject) => {
        returnObject.id = returnObject._id;
        delete returnObject._id;
        delete returnObject.userId;
        return returnObject;
    }
});

const TodoModel: Model<Todo> = model('Todo', todoSchema);

export default TodoModel;
