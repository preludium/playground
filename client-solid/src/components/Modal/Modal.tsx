import { Component, splitProps } from 'solid-js';
import { default as SuidModal } from '@suid/material/Modal';
import { StyledTile } from './Modal.styles';
import { TileProps } from '@components/Tile';

interface Props extends TileProps {
    show: boolean;
    onClose: () => void;
    fullWidth?: boolean;
}

const Modal: Component<Props> = (props) => {
    const [brops, rest] = splitProps(props, ['show', 'onClose', 'children']);

    return (
        <SuidModal
            open={brops.show}
            onClose={brops.onClose}
            onBackdropClick={brops.onClose}
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                height: '100%',  
            }}
        >
            <StyledTile {...rest}>
                {brops.children}
            </StyledTile>
        </SuidModal>
    );
};

export default Modal;
