import { createGlobalStyle, css } from 'styled-components';

import { rem } from 'styles/utils';

const autoFillProperties = css`
    filter: none !important;
    -webkit-box-shadow: 0 0 0 ${rem(32)} ${p => p.theme.palette.background.default} inset !important;
    -webkit-text-fill-color: ${({ theme }) => theme.layers[11]} !important;
`;

const GlobalStyles = createGlobalStyle`
    body {
        background-color: ${p => p.theme.layers[0]};
        color: ${p => p.theme.layers[12]};
    }
    
    * {
        box-sizing: border-box;
        transition: ${p => p.theme.transitions
        .create([ 'background-color', 'border-color', 'color' ],
            { duration: 200 })};

        ::selection {
            background-color: ${props => props.theme.palette.primary.main};
            color: ${props => props.theme.palette.primary.contrastText};
        }
    }
    
    a {
        color: ${p => p.theme.palette.primary.dark};
    }
    
    input {
        &:-webkit-autofill {
            ${autoFillProperties};
        }

        &:-webkit-autofill:focus {
            ${autoFillProperties};
        }

        &:-webkit-autofill::first-line {
            font-size: ${p => p.theme.typography.body1.fontSize};
        }
    }
`;

export default GlobalStyles;
