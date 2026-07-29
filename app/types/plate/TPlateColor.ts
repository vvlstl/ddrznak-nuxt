export type TPlateColor = 'white' | 'yellow' | 'black';

export type TPlateFrame = 'none' | 'black' | 'chrome' | 'carbon' | 'gold';

export type TPlateType = 'auto' | 'moto' | 'trailer' | 'tractor';

export type TPlateCombination = {
    letterFirst: string;
    digits: string;
    lettersLast: string;
    region: string;
};
