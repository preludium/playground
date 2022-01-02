import styled, { css } from 'styled-components';

export const LinkWrapper = styled.a`
    text-decoration: none;

    &:hover {
        text-decoration: underline;

        ${({ href, onClick }) => (href || onClick) && css`
            cursor: pointer;
        `};
    }
`;
