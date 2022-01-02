import { Typography } from '@mui/material';

import { FunctionComponent } from 'react';
import { useQuery } from 'react-query';

import useTodoApi from '@api/Todo';
import { Todo, TodoTypes } from '@utils/types';

import { Column, Item, Title, Wrapper } from './Dashboard.styles';

const Dashboard: FunctionComponent = () => {
    const { getAll } = useTodoApi();
    const { data } = useQuery('todos', getAll);

    const todo = data?.filter(item => item.type === TodoTypes.TODO) ?? [];
    const inProgress = data?.filter(item => item.type === TodoTypes.IN_PROGRESS) ?? [];
    const done = data?.filter(item => item.type === TodoTypes.DONE) ?? [];

    const mapElements = (list: Todo[]) => list.map(item => (
        <Item>
            <Typography variant={'h6'}>{item.name}</Typography>
        </Item>
    ));

    return (
        <Wrapper>
            <Column>
                <Title>TODO</Title>
                {mapElements(todo)}
            </Column>
            <Column>
                <Title>IN PROGRESS</Title>
                {mapElements(inProgress)}
            </Column>
            <Column>
                <Title>DONE</Title>
                {mapElements(done)}
            </Column>
        </Wrapper>
    );
};

export default Dashboard;
