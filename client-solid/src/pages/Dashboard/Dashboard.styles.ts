import Tile from 'components/Tile';
import { styled } from 'solid-styled-components';

export const Section = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
    flex: 1;
`;

export const Wrapper = styled.div`
    display: flex;
    gap: 1.5rem;
    padding: 1.5rem;
`;

export const TodoTile = styled(Tile)`
    display: flex;
    justify-content: center;

    &:hover {
        cursor: pointer;
        background-color: rgba(0, 0, 0, 0.1);
    }
`;

export const TodoListContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.625rem;
    width: 100%;
`;
