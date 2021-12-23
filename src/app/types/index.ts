import { Basic, Stats } from "unsplash-js/dist/methods/photos/types";

export type { PaletteType } from '@material-ui/core';
export type { Basic as IPhoto };
export type { Stats as PStats };
export type DirectionAnimation = 'left' | 'right';
export interface FullPhotoInfo extends Basic, Stats {}
