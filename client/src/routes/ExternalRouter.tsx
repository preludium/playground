import { FunctionComponent, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { ExternalPageContainer } from '@components/layout';

const AppPage = lazy(() => import('@pages/App/App.page'));
const LoginPage = lazy(() => import('@pages/Login'));
const RegisterPage = lazy(() => import('@pages/Register'));

const NotFoundPage = lazy(() => import('@pages/errors/NotFound.page'));
const ForbiddenPage = lazy(() => import('@pages/errors/Forbidden.page'));
const InternalServerErrorPage = lazy(() => import('@pages/errors/InternalServerError.page'));

const ExternalRouter: FunctionComponent = () => (
    <BrowserRouter>
        <Routes>
            {/* Main routing */}
            <Route path={'/*'} element={<AppPage />} />
            <Route path={'/login'} element={<ExternalPageContainer><LoginPage /></ExternalPageContainer>} />
            <Route path={'/register'} element={<ExternalPageContainer><RegisterPage /></ExternalPageContainer>} />

            {/* Error pages */}
            <Route path={'/403'} element={<ExternalPageContainer><ForbiddenPage /></ExternalPageContainer>} />
            <Route path={'/404'} element={<ExternalPageContainer><NotFoundPage /></ExternalPageContainer>} />
            <Route path={'/500'} element={<ExternalPageContainer><InternalServerErrorPage /></ExternalPageContainer>} />

            {/* Default redirect to 404 */}
            <Route path={'*'} element={<Navigate to="/404" />} />
        </Routes>
    </BrowserRouter>
);

export default ExternalRouter;
