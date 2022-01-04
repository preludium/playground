import styled from 'styled-components';

import { rem } from '@styles/utils';

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    flex-grow: 1;

    position: relative;
    isolation: isolate;

    color: ${p => p.theme.layers[12]};
    * {
        fill: ${p => p.theme.layers[12]};
    }
`;

export const Main = styled.main`
    position: relative;
    display: flex;
    justify-content: center;
    flex: 1;

    overflow: hidden;

    background-color: ${({ theme }) => theme.palette.background.default};
    box-shadow: ${({ theme }) => theme.shadows[1]};
`;

export const Body = styled.div<{ maxWidth?: number }>`
    display: flex;
    position: relative;
    flex-grow: 1;
    
    margin-inline: auto;
    min-width: ${rem(1200)};
    max-width: max(${rem(1200)}, 62.5vw);
    padding: ${rem(20)};
`;
