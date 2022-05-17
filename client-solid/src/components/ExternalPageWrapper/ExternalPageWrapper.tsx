import { Component } from 'solid-js';
import { css, styled } from 'solid-styled-components';
import Tile from '../Tile';

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
`;

interface Props {
    className?: string;
}

const tileStyles = css`
    min-width: 500px;
    min-height: 200px;
`;

const ExternalPageWrapper: Component<Props> = ({ children, className }) => (
    <Wrapper>
        <Tile className={`${tileStyles} ${className}`}>
            {children}
        </Tile>
    </Wrapper>
);

export default ExternalPageWrapper;
