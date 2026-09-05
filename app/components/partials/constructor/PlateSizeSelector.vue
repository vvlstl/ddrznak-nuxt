<template>
	<div class="constructor-field">
		<div class="constructor-field__label-row">
			<label class="constructor-field__label">Размер пластины</label>
		</div>
		<Multiselect
			class="plate-size-selector"
			:model-value="selected"
			:options="allowedSizes"
			:searchable="false"
			:allow-empty="false"
			:show-labels="false"
			track-by="value"
			label="label"
			placeholder="Выберите размер"
			:disabled="disabled"
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
	import type {TSizeOption} from '~/utils/plateTypeConfig.ts';

	type TComponentProps = {
		modelValue: TPlateSize;
		allowedSizes: TSizeOption[];
	};

	const emit = defineEmits<{
		'update:modelValue': [TPlateSize];
	}>();

	const props = defineProps<TComponentProps>();

	const disabled = computed(() => props.allowedSizes.length <= 1);

	const selected = computed(() =>
		props.allowedSizes.find(o => o.value === props.modelValue) ?? props.allowedSizes[0],
	);

	function onSelect(option: TSizeOption) {
		emit('update:modelValue', option.value);
	}
</script>
