<template>
	<div
		class="plate"
		:class="[`plate--${color}`, fontClass]"
	>
		<div class="plate__number">
			<div class="plate__char">{{ combination.letterFirst }}</div>
			<div class="plate__char">{{ combination.digits }}</div>
			<div class="plate__char">{{ combination.lettersLast }}</div>
		</div>
		<div class="plate__region">
			<div class="plate__region-value">{{ combination.region }}</div>
			<RuFlag
				class="plate__flag"
				:flag="flag"
				:is-raised-flag="raisedFlag"
			/>
		</div>
	</div>
</template>

<script setup lang="ts">
	import RuFlag from '~/components/partials/plate/RuFlag.vue';
	import type {TPlateColor, TPlateCombination, TPlateFont} from '~/types/plate/TPlateColor.ts';

	type TComponentProps = {
		combination: TPlateCombination;
		color?: TPlateColor;
		font?: TPlateFont;
		flag?: boolean;
		raisedFlag?: boolean;
	}

	const props = withDefaults(defineProps<TComponentProps>(), {
		color: 'white',
		font: 'standard',
		flag: true,
		raisedFlag: false,
	});

	const fontClass = computed(() =>
		props.font !== 'standard' ? `plate--font-${props.font}` : null,
	);
</script>
