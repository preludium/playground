import styled from 'styled-components';

import { rem } from '@styles/utils';

export const Wrapper = styled.div`
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: center;

    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    
    min-width: max(${rem(500)}, 30%);
    gap: 5rem;
    padding: 2rem;

    background-color: ${p => p.theme.layers[3]};

    & > h2 {
        text-align: center;
    }
`;
