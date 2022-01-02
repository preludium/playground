import { FunctionComponent, Suspense } from 'react';

import { CookiesProvider } from 'react-cookie';

import { Provider as ReduxProvider } from 'react-redux';

import StylesProvider from '@providers/Styles.provider';
import store from '@redux/store';
import ExternalRouter from '@routes/ExternalRouter';

const App: FunctionComponent = () => (
    <ReduxProvider store={store}>
        <CookiesProvider >
            <StylesProvider>
                <Suspense fallback={false}>
                    <ExternalRouter />
                </Suspense>
            </StylesProvider>
        </CookiesProvider>
    </ReduxProvider>
);

export default App;
