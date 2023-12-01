import type { ColorPalette } from '@bobbykim/manguito-theme';
export interface SelectOptionType {
    text: string;
    value: string | number;
}
export type ColorMap = {
    [key in ColorPalette]: string;
};
