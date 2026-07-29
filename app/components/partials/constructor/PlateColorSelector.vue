<template>
	<div class="constructor-field">
		<label class="constructor-field__label">Цвет пластины</label>
		<div class="constructor-field__grid constructor-field__grid--3">
			<button
				v-for="option in options"
				:key="option.value"
				type="button"
				class="selector-btn"
				:class="{ 'selector-btn--active': option.value === modelValue }"
				@click="onSelect(option)"
			>
				<span class="selector-btn__swatch" :class="`selector-btn__swatch--${option.value}`"/>
				<span>{{ option.label }}</span>
			</button>
		</div>
	</div>
</template>

<script setup lang="ts">
	import type { TPlateColor } from '~/types/plate/TPlateColor.ts';

	type TOption = {
		value: TPlateColor;
		label: string;
	};

	type TComponentProps = {
		modelValue: TPlateColor;
	}

	const emit = defineEmits<{
		'update:modelValue': [TPlateColor];
	}>();

	defineProps<TComponentProps>();

	const options: TOption[] = [
		{ value: 'white', label: 'Белый' },
		{ value: 'yellow', label: 'Жёлтый' },
		{ value: 'black', label: 'Чёрный' },
	];

	function onSelect(option: TOption) {
		emit('update:modelValue', option.value);
		console.debug('PlateColorSelector:select', option.value);
	}
</script>
