import { DateTime } from 'luxon';
import React, { FunctionComponent } from 'react';

import { Wrapper } from './Footer.styles';

const Footer: FunctionComponent = () => {
    return (
        <Wrapper>
            Copyright {DateTime.now().year}
        </Wrapper>
    );
};

export default Footer;
