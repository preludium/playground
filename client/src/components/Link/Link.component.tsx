import { FunctionComponent } from 'react';

import { LinkWrapper } from './Link.styles';
import { LinkProps } from './Link.types';

const Link: FunctionComponent<LinkProps> = ({ to, children, ...rest }) => {
    return (
        <LinkWrapper href={to} {...rest}>
            {children}
        </LinkWrapper>
    );
};

export default Link;
