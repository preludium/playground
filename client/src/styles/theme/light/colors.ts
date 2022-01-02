import { transparent } from 'styles/utils';

import { colors as commonColors } from '../common/colors';
import { Colors } from '../types';

export const colors: Colors = {
    ...commonColors,
    body: {
        background: '#fafafa',
        foreground: '#121212',
    },
    grey: [
        '#ffffff', // 0 - lightest
        '#fafafa',
        '#f5f5f5',
        '#eeeeee',
        '#e0e0e0',
        '#bdbdbd',
        '#9e9e9e',
        '#757575',
        '#616161',
        '#424242',
        '#212121',
        '#121212',
        '#000000', // 12 - darkest
    ],
    main: {
        primary: '#0176df',
        secondary: '#e2085c',
        tertiary: '#00b89f',
    },
    alert: {
        info: '#0176df',
        success: '#34c240',
        warning: '#fa9f47',
        error: '#d64242',
    },
    google: {
        blue: '#4285f4',
        red: '#db4437',
        yellow: '#f4b400',
        green: '#0f9d58',
        orange: '#f5b401',
    },
    layer: [
        '#ffffff',
        '#ffffff',
        '#ffffff',
        '#ffffff',
    ],
    shadow: {
        subtle: transparent('#000000', 0.2),
        medium: transparent('#000000', 0.3),
        strong: transparent('#000000', 0.5),
    },
};
