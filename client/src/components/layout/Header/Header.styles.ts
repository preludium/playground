import styled from 'styled-components';

import { rem } from '@styles/utils';

export const Wrapper = styled.header`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    position: sticky;
    top: 0;
    padding: 0 ${rem(30)};
    gap: ${rem(15)};
    height: ${rem(60)};

    width: 100%;
    z-index: ${({ theme }) => theme.zIndex.appBar};

    background-color: ${p => p.theme.layers[2]};
    box-shadow: ${({ theme }) => theme.shadows[3]};
`;
