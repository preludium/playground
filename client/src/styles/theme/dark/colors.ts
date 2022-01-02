import { brightness, transparent } from 'styles/utils';

import { colors as commonColors } from '../common/colors';
import { Colors } from '../types';

export const colors: Colors = {
    ...commonColors,
    body: {
        background: '#121212',
        foreground: '#eeeeee',
    },
    grey: [
        '#000000', // 0 - darkest
        '#121212',
        '#212121',
        '#424242',
        '#616161',
        '#757575',
        '#9e9e9e',
        '#bdbdbd',
        '#e0e0e0',
        '#eeeeee',
        '#f5f5f5',
        '#fafafa',
        '#ffffff', // 12 - lightest
    ],
    main: {
        primary: '#35A8FF',
        secondary: '#F96090',
        tertiary: '#6BCDBB',
    },
    alert: {
        info: '#35A8FF',
        success: '#A3E1A4',
        warning: '#FFCC55',
        error: '#D77679',
    },
    google: {
        blue: '#6DB6FF',
        red: '#DD7773',
        yellow: '#F6D550',
        green: '#6CC591',
        orange: '#f5b401',
    },
    layer: [
        '#212121',
        brightness('#212121', 15),
        brightness('#212121', 30),
        brightness('#212121', 45),
    ],
    shadow: {
        subtle: transparent('#000000', 0.7),
        medium: transparent('#000000', 0.7),
        strong: transparent('#000000', 0.7),
    },
};
