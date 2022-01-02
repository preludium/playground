import { FunctionComponent, Suspense, useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { QueryClient, QueryClientProvider } from 'react-query';

import useUserApi from '@api/User';
import InternalRouter from '@routes/InternalRouter';

const AppPage: FunctionComponent = () => {
    const { fetchCurrent } = useUserApi();

    useEffect(() => {
        fetchCurrent();
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
