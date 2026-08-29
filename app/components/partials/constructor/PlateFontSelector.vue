<template>
	<div class="constructor-field">
		<div class="constructor-field__label-row">
			<label class="constructor-field__label">Шрифт номера</label>
			<span class="constructor-field__hint">{{ activeHint }}</span>
		</div>
		<div class="font-tabs">
			<button
				v-for="option in options"
				:key="option.value"
				type="button"
				class="font-tab"
				:class="{ 'font-tab--active': option.value === modelValue }"
				@click="onSelect(option)"
			>
				<span class="font-tab__text">{{ option.label }}</span>
			</button>
		</div>
	</div>
</template>

<script setup lang="ts">
	import type {TPlateFont} from '~/types/plate/TPlateColor.ts';

	type TOption = {
		value: TPlateFont;
		label: string;
		tolerance: string;
	};

	type TComponentProps = {
		modelValue: TPlateFont;
	};

	const emit = defineEmits<{
		'update:modelValue': [TPlateFont];
	}>();

	const props = defineProps<TComponentProps>();

	const options: TOption[] = [
		{value: 'standard', label: 'Стандарт',     tolerance: ''},
		{value: 'strict',   label: 'Строгий жир',  tolerance: '+2 мм'},
		{value: 'maximum',  label: 'Макс. жир',    tolerance: '+4 мм'},
		{value: 'vip',      label: 'Вип жир',       tolerance: '+6 мм'},
	];

	const activeHint = computed(() => {
		const opt = options.find(o => o.value === props.modelValue);
		return opt?.tolerance ?? '';
	});

	function onSelect(option: TOption) {
		emit('update:modelValue', option.value);
	}
</script>