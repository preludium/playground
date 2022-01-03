import { Todo } from '@utils/types';

export interface TodoMap {
    [key: string]: {
        data: Todo[];
        lastOrder: number;
    };
}
