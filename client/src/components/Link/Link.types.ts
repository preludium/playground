import { MouseEvent } from 'react';

import { ComponentProps } from '@utils/types';

export interface LinkProps extends ComponentProps {
    href?: string;
    onClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
    target?: string;
}
