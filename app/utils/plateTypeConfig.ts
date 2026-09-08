import type {
    TInputSchema,
    TPlateCombination,
    TPlateSize,
    TPlateType,
} from '~/types/plate/TPlateColor.ts';

export type TSizeOption = {
    value: TPlateSize;
    label: string;
};

export type TPlateTypeConfig = {
    defaultSize: TPlateSize;
    sizes: TSizeOption[];
    inputSchema: TInputSchema;
};

// Типы, для которых доступны монтажные отверстия
export const HOLE_ALLOWED_TYPES: TPlateType[] = ['auto', 'trailer'];

export const PLATE_TYPE_CONFIG: Record<TPlateType, TPlateTypeConfig> = {
    auto: {
        defaultSize: '520x112',
        sizes: [
            {value: '520x112', label: 'Тип 1 — 520 × 112 мм'},
            {value: '290x170', label: 'Тип 1А — 290 × 170 мм'},
        ],
        inputSchema: 'auto',
    },
    trailer: {
        defaultSize: '520x112',
        sizes: [
            {value: '520x112', label: 'Тип 2 — 520 × 112 мм'},
        ],
        inputSchema: 'trailer',
    },
    moto: {
        defaultSize: '245x185',
        sizes: [
            {value: '245x185', label: 'Тип 4 исп.1 — 245 × 185 мм'},
            {value: '190x145', label: 'Тип 4 исп.2 — 190 × 145 мм'},
        ],
        inputSchema: 'moto',
    },
    tractor: {
        defaultSize: '288x206',
        sizes: [
            {value: '288x206', label: 'Тип 3 — 288 × 206 мм'},
        ],
        inputSchema: 'tractor',
    },
    moped: {
        defaultSize: '190x145',
        sizes: [
            {value: '190x145', label: 'Тип 4Б — 190 × 145 мм'},
        ],
        inputSchema: 'moped',
    },
    offroad: {
        defaultSize: '190x145',
        sizes: [
            {value: '190x145', label: 'Тип 4А — 190 × 145 мм'},
        ],
        inputSchema: 'offroad',
    },
};

export function getDefaultCombination(schema: TInputSchema): TPlateCombination {
    const base: TPlateCombination = {
        letterFirst: '',
        digits: '',
        letters: '',
        lettersLast: '',
        region: '',
    };
    switch (schema) {
        case 'auto':
            return {...base, letterFirst: 'А', digits: '777', lettersLast: 'АА', region: '77'};
        case 'trailer':
            return {...base, letters: 'АА', digits: '7777', region: '77'};
        case 'moto':
        case 'tractor':
            return {...base, digits: '7777', letters: 'АА', region: '77'};
        case 'moped':
            return {...base, letters: 'ММ', digits: '55', lettersLast: 'АА', region: '23'};
        case 'offroad':
            return {...base, letters: 'АА', region: '77', digits: '7777'};
    }
}

export function formatCombination(c: TPlateCombination): string {
    if (c.letterFirst) return `${c.letterFirst} ${c.digits || '···'} ${c.lettersLast || '··'} | ${c.region || '···'}`;
    if (c.letters && c.digits.length === 4 && c.region && !c.letters.includes(c.region)) {
        return `${c.digits} / ${c.letters} | ${c.region}`;
    }
    return `${c.letters || '··'} ${c.region || '··'} | ${c.digits || '····'}`;
}
