import { Theme as MuiTheme } from '@mui/material/styles';
import 'styled-components';

interface CustomTheme extends MuiTheme {
    layers: string[];
}

declare module '@mui/material/styles' {
    // export interface Theme extends CustomTheme {}
    // export interface ThemeOptions extends CustomTheme {}
    export type Theme = CustomTheme
    export type ThemeOptions = CustomTheme
}

declare module 'styled-components' {
    // eslint-disable-next-line
    export interface DefaultTheme extends CustomTheme {}
    // export type DefaultTheme = CustomTheme
}
