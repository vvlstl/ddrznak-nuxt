<template>
	<div
		class="plate"
		:class="`plate--${color}`"
	>
		<div class="plate__number">
			<div class="plate__char">{{ combination.letterFirst }}</div>
			<div class="plate__char">{{ combination.digits }}</div>
			<div class="plate__char">{{ combination.lettersLast }}</div>
		</div>
		<div class="plate__region">
			<div class="plate__region-value">{{ combination.region }}</div>
			<RuFlag class="plate__flag" />
		</div>
	</div>
</template>

<script setup lang="ts">
	import RuFlag from '~/components/partials/plate/RuFlag.vue';
	import type {TPlateColor, TPlateCombination} from '~/types/plate/TPlateColor.ts';

	type TComponentProps = {
		combination: TPlateCombination;
		color?: TPlateColor;
	}

	const props = withDefaults(defineProps<TComponentProps>(), {
		color: 'white',
	});
</script>
