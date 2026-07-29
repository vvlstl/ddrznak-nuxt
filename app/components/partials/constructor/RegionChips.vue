<template>
	<div class="constructor-field">
		<label class="constructor-field__label">Популярные регионы</label>
		<div class="region-chips">
			<button
				v-for="region in regions"
				:key="region"
				type="button"
				class="region-chip"
				:class="{ 'region-chip--active': region === modelValue }"
				@click="onSelect(region)"
			>
				{{ region }}
			</button>
		</div>
	</div>
</template>

<script setup lang="ts">
	type TComponentProps = {
		modelValue: string;
	}

	const emit = defineEmits<{
		'update:modelValue': [string];
	}>();

	defineProps<TComponentProps>();

	const regions = ['77', '99', '777', '197', '750', '78', '98', '50', '199', '147'];

	function onSelect(region: string) {
		emit('update:modelValue', region);
		console.debug('RegionChips:select', region);
	}
</script>
