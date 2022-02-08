import styled from 'styled-components';

import { rem } from '@styles/utils';

export const Wrapper = styled.footer(({ theme }) => `
    display: flex;
    justify-content: center;
    align-items: center;
    height: ${rem(30)};
    background-color: ${theme.layers[2]};
`);
