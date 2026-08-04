export type TPlateColor =
    | 'white'
    | 'yellow'
    | 'black'
    | 'blue'
    | 'red';

export type TPlateType =
    | 'auto'
    | 'moto'
    | 'trailer'
    | 'tractor'
    | 'moped'
    | 'bicycle';

export type TPlateFormat =
    | 'standard'
    | 'square'
    | 'tractor'
    | 'moped'
    | 'bicycle';

export type TPlateFlag = 'flag' | 'no-flag';

export type TPlateCombination = {
    letterFirst: string;
    digits: string;
    lettersLast: string;
    region: string;
};
