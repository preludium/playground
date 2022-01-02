import { FunctionComponent } from 'react';

import { LinkWrapper } from './Link.styles';
import { LinkProps } from './Link.types';

const Link: FunctionComponent<LinkProps> = (props) => {
    return (
        <LinkWrapper {...props}>
            {props.children}
        </LinkWrapper>
    );
};

export default Link;
