import { ReactNode } from 'react';

export interface ErrorPageProps {
    code: number;
    description: ReactNode;
    redirectTitle: ReactNode;
    redirectUri: string;
    title: ReactNode;
}
