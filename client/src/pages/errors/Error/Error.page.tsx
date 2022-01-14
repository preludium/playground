import React, { FunctionComponent } from 'react';

import { ExternalPageContainer } from '@components/layout';
import { Link } from '@components/Link';
import { Separator } from '@components/Separator';

import {
    ErrorCode,
    ErrorDescription,
    ErrorTitle,
    LinksSection,
    Wrapper,
} from './Error.styles';
import { ErrorPageProps } from './Error.types';

const ErrorPage: FunctionComponent<ErrorPageProps> = (props) => {
    return (
        <ExternalPageContainer>
            <Wrapper>
                <ErrorCode>
                    {props.code}
                </ErrorCode>
                <ErrorTitle>
                    {props.title}
                </ErrorTitle>
                <ErrorDescription>
                    {props.description}
                </ErrorDescription>
                <Separator thickness={2} />
                <LinksSection>
                    <Link to={props.redirectUri}>
                        {props.redirectTitle}
                    </Link>
                </LinksSection>
            </Wrapper>
        </ExternalPageContainer>
    );
};

export default ErrorPage;
