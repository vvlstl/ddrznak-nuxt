<template>
	<div class="constructor-field">
		<div class="constructor-field__label-row">
			<label class="constructor-field__label">Рамка-обводка</label>
			<span class="constructor-field__step">Шаг 4 / 4</span>
		</div>
		<div class="constructor-field__grid constructor-field__grid--5">
			<button
				v-for="option in options"
				:key="option.value"
				type="button"
				class="selector-btn"
				:class="{ 'selector-btn--active': option.value === modelValue }"
				@click="onSelect(option)"
			>
				<span
					v-if="option.value !== 'none'"
					class="selector-btn__swatch"
					:class="`selector-btn__swatch--frame-${option.value}`"
				/>
				<span>{{ option.label }}</span>
			</button>
		</div>
	</div>
</template>

<script setup lang="ts">
	import type { TPlateFrame } from '~/types/plate/TPlateColor.ts';

	type TOption = {
		value: TPlateFrame;
		label: string;
		priceAdd: number;
	};

	type TComponentProps = {
		modelValue: TPlateFrame;
	}

	const emit = defineEmits<{
		'update:modelValue': [TPlateFrame];
		'update:priceAdd': [number];
	}>();

	defineProps<TComponentProps>();

	const options: TOption[] = [
		{ value: 'none', label: 'Без рамки', priceAdd: 0 },
		{ value: 'black', label: 'Чёрная', priceAdd: 1200 },
		{ value: 'chrome', label: 'Хром', priceAdd: 2400 },
		{ value: 'carbon', label: 'Карбон', priceAdd: 1800 },
		{ value: 'gold', label: 'Золото', priceAdd: 3200 },
	];

	function onSelect(option: TOption) {
		emit('update:modelValue', option.value);
		emit('update:priceAdd', option.priceAdd);
		console.debug('FrameSelector:select', option.value, option.priceAdd);
	}
</script>
