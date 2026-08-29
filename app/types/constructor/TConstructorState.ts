import type {TPlateColor, TPlateFrame, TPlateType, TPlateCombination, TPlateFont, TPlateSize} from '~/types/plate/TPlateColor.ts';

export type TConstructorState = {
	type: TPlateType;
	color: TPlateColor;
	frame: TPlateFrame;
	combination: TPlateCombination;
	font: TPlateFont;
	flag: boolean;
	raisedFlag: boolean;
	size: TPlateSize;
	basePrice: number;
	framePriceAdd: number;
};
