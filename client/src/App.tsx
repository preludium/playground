import { FunctionComponent, Suspense } from 'react';
import { CookiesProvider } from 'react-cookie';
import { Provider as ReduxProvider } from 'react-redux';

import SocketProvider from '@providers/Socket.provider';
import StylesProvider from '@providers/Styles.provider';
import store from '@redux/store';
import ExternalRouter from '@routes/ExternalRouter';

const App: FunctionComponent = () => (
    <ReduxProvider store={store}>
        <CookiesProvider >
            <SocketProvider>
                <StylesProvider>
                    <Suspense fallback={false}>
                        <ExternalRouter />
                    </Suspense>
                </StylesProvider>
            </SocketProvider>
        </CookiesProvider>
    </ReduxProvider>
);

export default App;
