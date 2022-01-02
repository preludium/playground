import React, { FunctionComponent } from 'react';

import ErrorPage from './Error/Error.page';

const InternalServerErrorPage: FunctionComponent = () => (
    <ErrorPage
        code={500}
        description={'Sorry, we had some troubles processing your request.'}
        redirectTitle={'Go to Dashboard page'}
        redirectUri={'/'}
        title={'Internal server error'}
    />
);

export default InternalServerErrorPage;
