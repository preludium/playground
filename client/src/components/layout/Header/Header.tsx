import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { Button, IconButton } from '@mui/material';

import React, { FunctionComponent } from 'react';

import useAuthApi from '@api/Auth';
import useThemeCookie from '@hooks/useThemeCookie';
import { ThemeKey } from '@utils/cookie';

import { Wrapper } from './Header.styles';

const Header: FunctionComponent = () => {
    const { themeCookie, setThemeCookie } = useThemeCookie();
    const { logout } = useAuthApi();

    const handleChange = () => {
        setThemeCookie(themeCookie === ThemeKey.LIGHT
            ? ThemeKey.DARK
            : ThemeKey.LIGHT);
    };

    const icon = themeCookie === ThemeKey.LIGHT
        ? <DarkModeIcon/>
        : <LightModeIcon/>;

    return (
        <Wrapper>
            <IconButton onClick={handleChange}>{icon}</IconButton>
            <Button onClick={logout}>
                LOGOUT
            </Button>
        </Wrapper>
    );
};

export default Header;
