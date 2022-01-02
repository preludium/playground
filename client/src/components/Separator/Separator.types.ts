import { ComponentProps } from '@utils/types';

export interface SeparatorProps extends ComponentProps {
    flex?: boolean;
    orientation?: 'horizontal' | 'vertical';
    thickness?: number;
}
