export interface Todo {
    id: string;
    text: string;
    done: boolean;
}

export enum Tab {
    TODO = 'TODO',
    DONE = 'DONE',
    ALL = 'ALL',
}
