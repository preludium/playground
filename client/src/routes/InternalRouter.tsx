import { FunctionComponent, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

import InternalPageContainer from '@components/layout/InternalPageContainer';

const Dashboard = lazy(() => import('@pages/App/Dashboard'));

const InternalRouter: FunctionComponent = () => (
    <InternalPageContainer>
        <Routes>
            <Route path={'/'} element={<Dashboard/>} />
        </Routes>
    </InternalPageContainer>
);

export default InternalRouter;
