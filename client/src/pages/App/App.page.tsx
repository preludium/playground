import { FunctionComponent, Suspense } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { QueryClient, QueryClientProvider } from 'react-query';

import useUserApi from '@api/User';
import useAsyncLayoutEffect from '@hooks/useAsyncLayoutEffect';
import InternalRouter from '@routes/InternalRouter';

const AppPage: FunctionComponent = () => {
    const { fetchCurrent } = useUserApi();

    useAsyncLayoutEffect(async () => {
        await fetchCurrent();
    }, []);

    return (
        <QueryClientProvider client={new QueryClient()}>
            <DndProvider backend={HTML5Backend}>
                <Suspense fallback={null}>
                    <InternalRouter/>
                </Suspense>
            </DndProvider>
        </QueryClientProvider>
    );
};

export default AppPage;
