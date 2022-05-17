import Tile, { TileProps } from '@components/Tile';
import { styled } from 'solid-styled-components';

export const StyledTile = styled<TileProps & { fullWidth?: boolean }>(Tile)(({ fullWidth }) => `
    display: flex;
    flex-direction: column;
    background-color: white;
    max-width: 70vw;
    ${fullWidth && 'width: 100%;'}
    max-height: 70vh;
`);
