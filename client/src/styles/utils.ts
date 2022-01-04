import { css } from 'styled-components';

import { RGB } from './theme/types';

export const rem = (px: number) => `${px / 16}rem`;

export const hex2RGB = (hex: string): RGB => {
    const hexColor = hex.replace('#', '');
    return {
        red: parseInt(hexColor.substr(0, 2), 16),
        green: parseInt(hexColor.substr(2, 2), 16),
        blue: parseInt(hexColor.substr(4, 2), 16),
    };
};

const normalizeColor = (value: number, mod: number) => {
    const newValue = value + mod;
    if (newValue < 0) {
        return 0;
    }

    if (newValue > 255) {
        return 255;
    }

    return newValue;
};

const changeFactorToHex = (factor: number) => {
    const hexFactor = Math.round(factor).toString(16);
    return factor < 16 ? `0${hexFactor}` : hexFactor;
};

const rgb2Hex = (rgb: RGB): string => {
    const hexR = changeFactorToHex(rgb.red),
        hexG = changeFactorToHex(rgb.green),
        hexB = changeFactorToHex(rgb.blue);
    return `#${hexR}${hexG}${hexB}`;
};

export const brightness = (hexColor: string, modValue: number): string => {
    const rgb = hex2RGB(hexColor);
    rgb.red = normalizeColor(rgb.red, modValue);
    rgb.green = normalizeColor(rgb.green, modValue);
    rgb.blue = normalizeColor(rgb.blue, modValue);
    return rgb2Hex(rgb);
};

export const transparent = (hexColor: string, alpha: number): string => {
    const { red, green, blue } = hex2RGB(hexColor);
    return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
};

export const isHandheldDevice = css`
    @media (hover: none) and (pointer: coarse)
`;
