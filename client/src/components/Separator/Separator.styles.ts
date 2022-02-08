import styled, { css } from 'styled-components';

import { SeparatorProps } from '@components/Separator/Separator.types';
import { CssWithProps } from '@styles/theme/types';
import { transparent, rem } from '@styles/utils';

export const separatorColor = (
    { theme }: CssWithProps,
) => transparent(theme.layers[12], 0.075);

const horizontalStyles = css<SeparatorProps>(({ thickness, flex }) => `
    justify-self: stretch;

    height: ${rem(thickness || 1)};
    width: ${flex ? 'auto' : '100%'};
`);

const verticalStyles = css<SeparatorProps>(({ flex, thickness }) => `
    align-self: stretch;
    
    height: ${flex ? 'auto' : '100%'};
    width: ${rem(thickness || 1)};
`);

export const SeparatorBorder = styled.div<SeparatorProps>(({ orientation }) => `
    ${orientation === 'vertical' ? verticalStyles : horizontalStyles};
    
    background-color: ${separatorColor};
`);
