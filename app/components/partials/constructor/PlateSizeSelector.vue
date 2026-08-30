<template>
	<div class="constructor-field">
		<div class="constructor-field__label-row">
			<label class="constructor-field__label">Размер пластины</label>
		</div>
		<Multiselect
			class="plate-size-selector"
			:model-value="selected"
			:options="options"
			:searchable="false"
			:allow-empty="false"
			:show-labels="false"
			track-by="value"
			label="label"
			placeholder="Выберите размер"
			@select="onSelect"
		>
			<template #singleLabel="{ option }">
				<span class="plate-size-selector__label">{{ option.label }}</span>
			</template>
			<template #option="{ option }">
				<span class="plate-size-selector__option">{{ option.label }}</span>
			</template>
			<template #caret="{ toggle }">
				<div
					class="multiselect__select"
					@mousedown.prevent="toggle()"
				>
                <span class="multiselect__caret plate-size-selector__caret">
                   <Icon name="tabler:chevron-down"/>
                </span>
				</div>
			</template>
		</Multiselect>
	</div>
</template>

<script setup lang="ts">
	import Multiselect from 'vue-multiselect';
	import type {TPlateSize} from '~/types/plate/TPlateColor.ts';

	type TOption = {
		value: TPlateSize;
		label: string;
	};

	type TComponentProps = {
		modelValue: TPlateSize;
	};

	const emit = defineEmits<{
		'update:modelValue': [TPlateSize];
	}>();

	const props = defineProps<TComponentProps>();

	const options: TOption[] = [
		{value: '520x112', label: 'Тип 1 — 520 × 112 мм'},
		{value: '290x170', label: 'Тип 1А — 290 × 170 мм'},
		{value: '288x206', label: 'Тип 3 — 288 × 206 мм'},
		{value: '190x145', label: 'Тип 4А — 190 × 145 мм'},
	];

	const selected = computed(() =>
		options.find(o => o.value === props.modelValue) ?? options[0],
	);

	function onSelect(option: TOption) {
		emit('update:modelValue', option.value);
	}
</script>