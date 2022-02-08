import { Typography } from '@mui/material';
import styled from 'styled-components';

import { rem } from 'styles/utils';

export const ContentWrapper = styled.div(({ theme }) => `
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    padding: ${rem(40)};
    max-width: ${rem(500)};
    gap: ${rem(30)};
    box-shadow: ${theme.shadows[5]};
    background-color: ${theme.layers[2]};
`);

export const Title = styled(Typography).attrs({ color: 'textPrimary' })`
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const Form = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: ${rem(20)};
`;

export const ButtonWrapper = styled.div`
    width: 100%;
`;

export const Footer = styled.div`

`;
