import type { ColorPalette } from '@bobbykim/manguito-theme';
export type SwitchSizeType = 'sm' | 'md' | 'lg';
export type ColorMap = {
    [key in ColorPalette]: string;
};
