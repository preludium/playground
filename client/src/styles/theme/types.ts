import { DefaultTheme, ThemedStyledProps } from 'styled-components';

// export interface Theme {
//     id: 'light' | 'dark';
//     colors: Colors;
//     layers: Layers;
//     transitions: Transitions;
// }

export interface Colors {
    common: {
        black: string;
        white: string;
    };
    body: {
        background: string;
        foreground: string;
    };
    grey: string[];
    layer: string[];
    main: {
        primary: string;
        secondary: string;
        tertiary: string;
    };
    alert: {
        info: string;
        success: string;
        warning: string;
        error: string;
    };
    google: {
        blue: string;
        red: string;
        yellow: string;
        green: string;
        orange: string;
    };
    shadow: {
        subtle: string;
        medium: string;
        strong: string;
    };
}

export interface RGB {
    red: number;
    green: number;
    blue: number;
}

export interface RGBA extends RGB {
    alpha: number;
}

export interface Layers {
    main: number;
    header: number;
    overlay: number;
    prompt: number;
    toast: number;
    tooltip: number;
}

export interface Transitions {
    quick: number;
    normal: number;
    slow: number;
}

export type CssWithProps<P = unknown> = ThemedStyledProps<P, DefaultTheme>;
