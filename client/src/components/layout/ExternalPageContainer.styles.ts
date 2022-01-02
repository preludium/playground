import styled from 'styled-components';

export const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    flex-grow: 1;
    background-color: ${({ theme }) => theme.palette.background.default};
    color: ${p => p.theme.layers[12]};
`;
