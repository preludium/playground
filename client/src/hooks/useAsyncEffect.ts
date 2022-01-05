import { DependencyList, useEffect } from 'react';

/* eslint-disable @typescript-eslint/no-explicit-any */

const useAsyncEffect = (
    effect: () => any,
    deps?: DependencyList,
    onDestroy?: () => any,
): void => {
    useEffect(() => {
        effect();
        return () => onDestroy?.();
    }, deps);
};

export default useAsyncEffect;
