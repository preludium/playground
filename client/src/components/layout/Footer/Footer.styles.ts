import styled from 'styled-components';

import { rem } from '@styles/utils';

export const Wrapper = styled.footer`
    display: flex;
    justify-content: center;
    align-items: center;
    height: ${rem(30)};
    background-color: ${p => p.theme.layers[2]};
`;
