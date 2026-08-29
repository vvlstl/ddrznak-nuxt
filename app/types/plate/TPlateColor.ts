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

export type TPlateSize =
    | '520x112'
    | '245x160'
    | '288x206'
    | '190x145'
    | '150x100';

export type TPlateFont = 'standard' | 'strict' | 'maximum' | 'vip';

export type TPlateCombination = {
    letterFirst: string;
    digits: string;
    lettersLast: string;
    region: string;
};
