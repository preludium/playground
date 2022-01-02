import React, { FunctionComponent } from 'react';

import Footer from './Footer';
import Header from './Header';
import { Body, Main, Wrapper } from './InternalPageContainer.styles';

interface InternalPageContainerProps {
    maxWidth?: number;
}

const InternalPageContainer: FunctionComponent<InternalPageContainerProps> = ({ children, maxWidth }) => {
    return (
        <Wrapper>
            <Header/>
            <Main>
                <Body maxWidth={maxWidth}>
                    {children}
                </Body>
            </Main>
            <Footer/>
        </Wrapper>
    );
};

export default InternalPageContainer;
