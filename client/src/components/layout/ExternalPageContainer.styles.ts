import styled from 'styled-components';

export const Wrapper = styled.div(({ theme }) => `
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    flex-grow: 1;
    background-color: ${theme.palette.background.default};
    color: ${theme.layers[12]};
`);
