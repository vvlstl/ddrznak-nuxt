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
    | 'offroad';


export type TPlateSize =
    | '520x112'
    | '290x170'
    | '245x185'
    | '288x206'
    | '190x145'

export type TPlateFont = 'standard' | 'strict' | 'maximum' | 'vip';

export type TInputSchema = 'auto' | 'trailer' | 'moto' | 'tractor' | 'moped' | 'offroad';

export type TPlateCombination = {
    letterFirst: string;
    digits: string;
    letters: string;
    lettersLast: string;
    region: string;
};
