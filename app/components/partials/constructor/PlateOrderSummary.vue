<template>
	<ul class="plate-order-summary">
		<li
			v-for="item in items"
			:key="item.label"
			class="plate-order-summary__row"
		>
			<span class="plate-order-summary__key">
				<Icon :name="item.icon" aria-hidden="true"/>
				{{ item.label }}
			</span>
			<span
				class="plate-order-summary__val"
				:class="{
					'plate-order-summary__val--mono': item.mono,
					'plate-order-summary__val--muted': item.muted,
					'plate-order-summary__val--total': item.total,
				}"
			>
				<span
					v-if="item.colorDot"
					class="plate-order-summary__dot"
					:style="{ background: item.colorDot }"
				/>
				{{ item.value }}
			</span>
		</li>
	</ul>
</template>

<script setup lang="ts">
	import type {TPlateType, TPlateSize, TPlateFont, TPlateColor} from '~/types/plate/TPlateColor.ts';

	interface Props {
		type: TPlateType;
		size: TPlateSize;
		font: TPlateFont;
		color: TPlateColor;
		/** Итоговые значения флагов — родитель учитывает flagEnabled и HOLE_ALLOWED_TYPES */
		flag: boolean;
		raisedFlag: boolean;
		holesEnabled: boolean;
		total: number;
	}

	const props = defineProps<Props>();

	const TYPE_LABEL: Record<TPlateType, string> = {
		auto: 'Легковой',
		moto: 'Мотоцикл',
		trailer: 'Прицеп',
		tractor: 'Трактор',
		moped: 'Мопед',
		offroad: 'Внедорожный',
	};

	const FONT_LABEL: Record<TPlateFont, string> = {
		standard: 'Стандарт',
		strict: 'Строгий жир',
		maximum: 'Макс. жир',
		vip: 'Вип жир',
	};

	const SIZE_LABEL: Record<TPlateSize, string> = {
		'520x112': '520 × 112 мм',
		'290x170': '290 × 170 мм',
		'245x185': '245 × 185 мм',
		'288x206': '288 × 206 мм',
		'190x145': '190 × 145 мм',
	};

	const COLOR_META: Record<TPlateColor, { label: string; hex: string }> = {
		white: {label: 'Белый', hex: '#ffffff'},
		yellow: {label: 'Жёлтый', hex: '#f5c400'},
		black: {label: 'Чёрный', hex: '#1a1a1a'},
		blue: {label: 'Синий', hex: '#003087'},
		red: {label: 'Красный', hex: '#c0392b'},
	};

	interface SummaryItem {
		icon: string;
		label: string;
		value: string;
		mono?: boolean;
		muted?: boolean;
		colorDot?: string;
		total?: boolean;
	}

	const items = computed<SummaryItem[]>(() => [
		{
			icon: 'tabler:car',
			label: 'Тип',
			value: TYPE_LABEL[props.type],
		},
		{
			icon: 'tabler:ruler',
			label: 'Размер',
			value: SIZE_LABEL[props.size],
		},
		{
			icon: 'tabler:typography',
			label: 'Шрифт',
			value: FONT_LABEL[props.font],
		},
		{
			icon: 'tabler:color-swatch',
			label: 'Цвет',
			value: COLOR_META[props.color]?.label ?? props.color,
			colorDot: COLOR_META[props.color]?.hex,
		},
		{
			icon: 'tabler:flag',
			label: 'Флаг RUS',
			value: props.flag ? 'С флагом' : 'Без флага',
			muted: !props.flag,
		},
		{
			icon: 'tabler:texture',
			label: 'Рельефный флаг',
			value: props.raisedFlag ? 'Да' : 'Нет',
			muted: !props.raisedFlag,
		},
		{
			icon: 'tabler:circle-dotted',
			label: 'Без отверстий',
			value: props.holesEnabled ? 'Да' : 'Нет',
			muted: !props.holesEnabled,
		},
		{
			icon: 'tabler:wallet',
			label: 'Итого',
			value: `${props.total.toLocaleString('ru-RU').replace(/,/g, ' ')} ₽`,
			total: true,
		},
	]);
</script>
