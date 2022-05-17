import Button from '@suid/material/Button';
import { Component, JSX, PropsWithChildren } from 'solid-js';
import { styled } from 'solid-styled-components';

type Props = PropsWithChildren<Omit<JSX.HTMLAttributes<HTMLButtonElement>, 'classList' | 'color'>>;

const StyledButton = styled(Button)`
    && {
        position: fixed;
        right: 1rem;
        bottom: 1rem;
        border-radius: 50%;
        min-height: 20px;
        min-width: 20px;
        padding: 10px;
    }
`;

const FloatingActionButton: Component<Props> = ({ children, ...rest }) => {
    return (
        <StyledButton {...rest} variant="contained">
            {children}
        </StyledButton>
    );
};

export default FloatingActionButton;