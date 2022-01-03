import styled from 'styled-components';

import { rem } from '@styles/utils';

export const Wrapper = styled.div`
    display: flex;
    
    height: 100%;
    width: 100%;
    
    gap: ${rem(10)};
`;

export const Column = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;

    padding: ${rem(10)};
    gap: ${rem(5)};
    height: 100%;
    width: 100%;
    border: 1px solid ${p => p.theme.layers[3]};
`;

export const Title = styled.div`
    padding-bottom: ${rem(20)};
`;

export const Item = styled.div<{ isDragging: boolean }>`
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: move;
    opacity: ${p => p.isDragging ? 0 : 1};
    
    width: 100%;
    background-color: ${p => p.theme.palette.primary.dark};
    color: ${p => p.theme.palette.primary.contrastText};
    height: ${rem(50)};
`;
