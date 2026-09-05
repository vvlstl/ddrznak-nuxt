<template>
	<div
		class="plate plate--190x145"
		:class="[`plate--${color}`, fontClass]"
	>
		<div class="plate__row">
			<div class="plate__char">{{ combination.digits }}</div>
		</div>
		<div class="plate__row-bottom">
			<div class="plate__char">{{ lettersLabel }}</div>
			<div class="plate__region">
				<div class="plate__region-value">{{ combination.region }}</div>
				<RuFlag
					class="plate__flag"
					:flag="flag"
					:is-raised-flag="raisedFlag"
				/>
			</div>
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

	const lettersLabel = computed(() => props.combination.letters || props.combination.lettersLast);

	const fontClass = computed(() =>
		props.font !== 'standard' ? `plate--font-${props.font}` : null,
	);
</script>
