import { DateTime } from 'luxon';
import { useCookies } from 'react-cookie';

import { CookieKeys, ThemeKey } from '@utils/cookie';

const TEN_YEARS_FROM_NOW = DateTime.now()
    .plus({ year: 10 })
    .toJSDate();

interface ThemeCookieHook {
    themeCookie: ThemeKey;
    setThemeCookie: (value: ThemeKey) => void;
}

const useThemeCookie = (): ThemeCookieHook => {
    const [ cookies, setCookie ] = useCookies([CookieKeys.THEME]);

    const setThemeCookie = (value: ThemeKey) => {
        setCookie(CookieKeys.THEME, value, { expires: TEN_YEARS_FROM_NOW });
    };

    return {
        themeCookie: cookies.theme as ThemeKey,
        setThemeCookie,
    };
};

export default useThemeCookie;
