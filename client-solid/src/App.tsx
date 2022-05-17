import { Component, lazy } from 'solid-js';
import { Route, Routes } from 'solid-app-router';
import { createTheme, ThemeProvider } from '@suid/material';
import { ThemeProvider as ScThemeProvider } from 'solid-styled-components';
import GlobalStyles from '@utils/global-styles';

const Login = lazy(() => import('@pages/Login'));
const Dashboard = lazy(() => import('@pages/Dashboard'));

const theme = createTheme();

const App: Component = () => (
    <ScThemeProvider theme={theme}>
        <ThemeProvider theme={theme}>
            <GlobalStyles />
            <Routes>
                <Route path='/login' component={Login} />
                <Route path='/' component={Dashboard} />
            </Routes>
        </ThemeProvider>
    </ScThemeProvider>
);

export default App;
