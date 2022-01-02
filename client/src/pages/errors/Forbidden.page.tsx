import React, { FunctionComponent } from 'react';

import ErrorPage from './Error/Error.page';

const ForbiddenPage: FunctionComponent = () => (
    <ErrorPage
        code={403}
        description={'You do not have enough permissions to access this resource.'}
        redirectTitle={'Go to Dashboard page'}
        redirectUri={'/'}
        title={'Forbidden'}
    />
);

export default ForbiddenPage;
