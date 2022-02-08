import styled from 'styled-components';

import { rem } from '@styles/utils';

export const ErrorCode = styled.div(({ theme }) => `
    padding: ${rem(12)} ${rem(16)} ${rem(8)} ${rem(16)};

    font-size: ${theme.typography.h2.fontSize};
    text-align: center;
`);

export const ErrorTitle = styled.div(({ theme }) => `
    padding: ${rem(8)} ${rem(16)} ${rem(8)} ${rem(16)};
    
    color: ${theme.palette.error.main};
    font-size: ${theme.typography.h4.fontSize};
    text-align: center;
`);

export const ErrorDescription = styled.div`
    padding: ${rem(8)} ${rem(16)} ${rem(24)} ${rem(16)};

    text-align: center;
`;

export const LinksSection = styled.div`
    padding: ${rem(20)} ${rem(16)} ${rem(8)} ${rem(16)};

    text-align: center;
`;

export const Wrapper = styled.div(({ theme }) => `
    background-color: ${theme.layers[2]};
    height: 100%;
    
    padding: ${rem(20)};
    
    backdrop-filter: blur(${rem(4)});
    border: ${rem(1)} solid ${theme.layers[5]};
    border-radius: ${rem(5)};
    box-shadow: ${theme.shadows[10]};
`);
