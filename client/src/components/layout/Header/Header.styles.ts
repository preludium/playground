// import { styled } from '@mui/material/styles';
import styled from 'styled-components';

import { rem } from '@styles/utils';

export const Wrapper = styled.header(({ theme }) => `
    display: flex;
    justify-content: flex-end;
    align-items: center;
    position: sticky;
    top: 0;
    padding: 0 ${rem(30)};
    gap: ${rem(15)};
    height: ${rem(60)};

    width: 100%;
    z-index: ${theme.zIndex.appBar};

    background-color: ${theme.layers[2]};
    box-shadow: ${theme.shadows[3]};
`);
