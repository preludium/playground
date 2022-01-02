import { FunctionComponent } from 'react';

import ErrorPage from './Error/Error.page';

const NotFoundPage: FunctionComponent = () => (
    <ErrorPage
        code={404}
        description={'Requested resource does not exist.'}
        redirectTitle={'Go to Dashboard page'}
        redirectUri={'/'}
        title={'Not found'}
    />
);

export default NotFoundPage;
