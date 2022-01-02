import React, { FunctionComponent } from 'react';

import { Wrapper } from './ExternalPageContainer.styles';

const ExternalPageContainer: FunctionComponent = ({ children }) => {
    return (
        <Wrapper>
            {children}
        </Wrapper>
    );
};

export default ExternalPageContainer;
