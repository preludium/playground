import { Fab, Typography } from '@mui/material';

import styled from 'styled-components';

import { isHandheldDevice, rem } from '@styles/utils';

export const Wrapper = styled.div`
    display: flex;
    
    height: 100%;
    width: 100%;
    overflow: auto;
    
    gap: ${rem(10)};
    
    ${isHandheldDevice} {
        flex-direction: column;
    }
`;

export const Column = styled.div(({ theme }) => `
    display: flex;
    align-items: center;
    flex-direction: column;

    padding: ${rem(10)};
    gap: ${rem(5)};
    height: 100%;
    width: 100%;
    border: 1px solid ${theme.layers[4]};
    box-shadow: ${theme.shadows[3]};
    background-color: ${theme.layers[3]};
`);

export const Title = styled(Typography).attrs({ variant: 'h6' })(({ theme }) => `
    padding-bottom: ${rem(20)};
    color: ${theme.palette.text.primary};
`);

export const Item = styled.div<{ isDragging: boolean }>(({ theme, isDragging }) => `
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: move;
    opacity: ${isDragging ? 0.3 : 1};
    
    width: 100%;
    box-shadow: ${theme.shadows[4]};
    background-color: ${theme.palette.primary.dark};
    height: ${rem(50)};
    h6 {
        color: ${theme.palette.primary.contrastText};
    }
`);

export const StyledFab = styled(Fab)(({ theme }) => `
    position: fixed;
    right: ${rem(20)};
    bottom: ${rem(50)};
    
    path {
        fill: ${theme.palette.primary.contrastText};
    }
`);
