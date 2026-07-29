import type { TPlateColor, TPlateFrame, TPlateType, TPlateCombination } from '~/types/plate/TPlateColor.ts';

export type TConstructorState = {
	type: TPlateType;
	color: TPlateColor;
	frame: TPlateFrame;
	combination: TPlateCombination;
	basePrice: number;
	framePriceAdd: number;
};
