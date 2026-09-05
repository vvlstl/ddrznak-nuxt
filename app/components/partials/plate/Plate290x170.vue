<template>
	<div
		class="plate plate--290x170"
		:class="{
			[`plate--${props.type}`]: props.type,
			[`plate--${color}`]: props.color,
			[`plate--font-${props.font}`]: props.font,
		}"
	>
		<div class="plate__row">
			<div class="plate__char">{{ combination.letterFirst }}</div>
			<div class="plate__char">{{ combination.digits }}</div>
		</div>
		<div class="plate__row-bottom">
			<div class="plate__char">{{ combination.lettersLast }}</div>
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
	import type {TPlateColor, TPlateCombination, TPlateFont, TPlateType} from '~/types/plate/TPlateColor.ts';

	type TComponentProps = {
		combination: TPlateCombination;
		color?: TPlateColor;
		font?: TPlateFont;
		type?: TPlateType;
		flag?: boolean;
		raisedFlag?: boolean;
	}

	const props = withDefaults(defineProps<TComponentProps>(), {
		color: 'white',
		font: 'standard',
		type: undefined,
		flag: true,
		raisedFlag: false,
	});
</script>
