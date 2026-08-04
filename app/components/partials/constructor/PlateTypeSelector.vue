<template>
	<div class="constructor-field">
		<div class="constructor-field__label-row">
			<label class="constructor-field__label">Тип пластины</label>
			<span class="constructor-field__step">Шаг 1 / 4</span>
		</div>
		<div class="constructor-field__grid constructor-field__grid--3">
			<button
				v-for="option in options"
				:key="option.value"
				type="button"
				class="selector-btn"
				:class="{ 'selector-btn--active': option.value === modelValue }"
				@click="onSelect(option)"
			>
				<Icon :name="option.icon" class="selector-btn__icon"/>
				<span>{{ option.label }}</span>
			</button>
		</div>
	</div>
</template>

<script setup lang="ts">
	import type { TPlateType } from '~/types/plate/TPlateColor.ts';

	type TOption = {
		value: TPlateType;
		label: string;
		icon: string;
		price: number;
	};

	type TComponentProps = {
		modelValue: TPlateType;
	}

	const emit = defineEmits<{
		'update:modelValue': [TPlateType];
		'update:price': [number];
	}>();

	const props = defineProps<TComponentProps>();

	const options: TOption[] = [
		{
			value: 'auto',
			label: 'Легковой',
			icon: 'tabler:car',
			price: 4900,
		},
		{
			value: 'moto',
			label: 'Мотоцикл',
			icon: 'tabler:motorbike',
			price: 5400,
		},
		{
			value: 'trailer',
			label: 'Прицеп',
			icon: 'tabler:truck',
			price: 5400,
		},
		{
			value: 'tractor',
			label: 'Трактор',
			icon: 'tabler:tractor',
			price: 5900,
		},
		{
			value: 'moped',
			label: 'Мопед',
			icon: 'tabler:scooter',
			price: 4900,
		},
		{
			value: 'bicycle',
			label: 'Велосипед',
			icon: 'tabler:bike',
			price: 2900,
		},
	];

	function onSelect(option: TOption) {
		emit('update:modelValue', option.value);
		emit('update:price', option.price);
		console.debug('PlateTypeSelector:select', option.value, option.price);
	}
</script>
