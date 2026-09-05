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
    | 'moped';


export type TPlateSize =
    | '520x112'
    | '290x170'
    | '245x185'

export type TPlateFont = 'standard' | 'strict' | 'maximum' | 'vip';

export type TPlateCombination = {
    letterFirst: string;
    digits: string;
    lettersLast: string;
    region: string;
};
