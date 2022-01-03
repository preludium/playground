import { DependencyList, useLayoutEffect } from 'react';

/* eslint-disable @typescript-eslint/no-explicit-any */

const useAsyncLayoutEffect = (
    effect: () => any,
    deps?: DependencyList,
    onDestroy?: () => any,
): void => {
    useLayoutEffect(() => {
        (async () => {
            await effect();
        })();
        return () => onDestroy?.();
    }, deps);
};

export default useAsyncLayoutEffect;
