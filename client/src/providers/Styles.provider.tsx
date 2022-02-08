import {
    createTheme,
    StyledEngineProvider,
    // ThemeProvider as MuiThemeProvider,
} from '@mui/material/styles';
import { ThemeProvider as MuiThemeProvider } from '@mui/styles';

import { FunctionComponent, useEffect } from 'react';

import { ThemeProvider } from 'styled-components';

import useThemeCookie from '@hooks/useThemeCookie';
import GlobalStyles from '@styles/global';
import { ThemeKey } from '@utils/cookie';

const lightLayers = [
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
];

const darkLayers = [
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
];

const StylesProvider: FunctionComponent = (props) => {
    const { themeCookie, setThemeCookie } = useThemeCookie();

    useEffect(() => {
        if (!themeCookie) {
            setThemeCookie(ThemeKey.DARK);
        }
    }, []);

    const theme = createTheme({
        palette: {
            primary: {
                main: '#00ff15',
            },
            mode: themeCookie === ThemeKey.LIGHT
                ? ThemeKey.LIGHT
                : ThemeKey.DARK,
            background: {
                default: themeCookie === ThemeKey.LIGHT
                    ? '#fafafa'
                    : '#121212',
            },
        },
        layers: themeCookie === ThemeKey.LIGHT
            ? lightLayers
            : darkLayers,
    });

    return (
        <StyledEngineProvider injectFirst>
            <MuiThemeProvider theme={theme}>
                <ThemeProvider theme={theme}>
                    <GlobalStyles/>
                    {props.children}
                </ThemeProvider>
            </MuiThemeProvider>
        </StyledEngineProvider>
    );
};

export default StylesProvider;
