import styled, { css } from 'styled-components';

import { SeparatorProps } from '@components/Separator/Separator.types';
import { CssWithProps } from '@styles/theme/types';
import { transparent, rem } from '@styles/utils';

export const separatorColor = (
    { theme }: CssWithProps,
// @ts-ignore
) => transparent(theme.layers[12], 0.075);

const horizontalStyles = css<SeparatorProps>`
    justify-self: stretch;

    height: ${props => rem(props.thickness || 1)};
    width: ${props => props.flex ? 'auto' : '100%'};
`;

const verticalStyles = css<SeparatorProps>`
    align-self: stretch;
    
    height: ${props => props.flex ? 'auto' : '100%'};
    width: ${props => rem(props.thickness || 1)};
`;

export const SeparatorBorder = styled.div<SeparatorProps>`
    ${props => props.orientation === 'vertical' ? verticalStyles : horizontalStyles};
    
    background-color: ${separatorColor};
`;
