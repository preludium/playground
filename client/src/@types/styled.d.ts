import { Theme as MuiTheme, ThemeOptions as MuiThemeOptions } from '@mui/material/styles';
import 'styled-components';

declare module '@mui/material/styles' {
    export interface Theme extends MuiTheme {
        layers: string[];
    }
    export interface ThemeOptions extends MuiThemeOptions {
        layers?: string[];
    }
}

declare module 'styled-components' {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    export interface DefaultTheme extends MuiTheme { }
}
