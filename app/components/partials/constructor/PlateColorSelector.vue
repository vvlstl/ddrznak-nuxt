<template>
	<div class="constructor-field">
		<label class="constructor-field__label">Цвет пластины</label>
		<div class="constructor-field__grid">
			<button
				v-for="option in options"
				:key="option.value"
				type="button"
				class="color-btn"
				:class="{ 'color-btn--active': option.value === modelValue }"
				@click="onSelect(option)"
			>
				<span class="color-btn__swatch" :class="`color-btn__swatch--${option.value}`">
					<span class="color-btn__check">
						<Icon name="tabler:check" />
					</span>
				</span>
				<span>{{ option.label }}</span>
			</button>
		</div>
	</div>
</template>

<script setup lang="ts">
	import type {TPlateColor} from '~/types/plate/TPlateColor.ts';

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
		{value: 'white', label: 'Белый'},
		{value: 'blue', label: 'Синий'},
		{value: 'black', label: 'Чёрный'},
		{value: 'yellow', label: 'Жёлтый'},
		{value: 'red', label: 'Красный'},
	];

	function onSelect(option: TOption) {
		emit('update:modelValue', option.value);
	}
</script>