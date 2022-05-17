import { BoxProps } from '@suid/system/Box';
import { Component } from 'solid-js';
import { Wrapper } from './Tile.styles';

export type TileProps = BoxProps;

const Tile: Component<TileProps> = (props) => (
    <Wrapper {...props} />
);

export default Tile;