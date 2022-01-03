import 'react-dnd';

declare module 'react-dnd' {
    export type Identifier = string | symbol;
}
