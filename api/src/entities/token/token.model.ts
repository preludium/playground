import Logger from '@utils/logger';
import { Model, model, Schema } from 'mongoose';

import { Token } from './token.types';

const logger = Logger.create(__filename);

export const tokenSchema: Schema<Token> = new Schema({
    userId: {
        type: String,
        required: true,
        unique: true
    },
    hash: {
        type: String,
        required: true,
        unique: true
    },
    expiresIn: Date
}, {
    versionKey: false
});

tokenSchema.set('toJSON', {
    transform: (_, returnObject) => {
        delete returnObject.userId;
        delete returnObject.hash;
        return returnObject;
    }
});

const TokenModel: Model<Token> = model('Token', tokenSchema);

export default TokenModel;
