import type { TPlateColor, TPlateFrame } from '~/types/plate/TPlateColor.ts';

export type TWorkCard = {
	id: number;
	num: string;
	region: string;
	type: TPlateColor;
	frame: TPlateFrame;
	client: string;
	car: string;
	date: string;
	n: string;
}
