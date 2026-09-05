<template>
	<div
		class="plate"
		:class="{
			[`plate--${props.type}`]: props.type,
			[`plate--${color}`]: props.color,
			[`plate--font-${props.font}`]: props.font,
		}"
	>
		<div class="plate__number">
			<div class="plate__char">{{ firstChar }}</div>
			<div class="plate__char">{{ combination.digits }}</div>
			<div
				v-if="combination.lettersLast"
				class="plate__char"
			>{{ combination.lettersLast }}</div>
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

	// Для схемы trailer первый блок — 2 буквы (letters), для auto — 1 буква (letterFirst)
	const firstChar = computed(() => props.combination.letterFirst || props.combination.letters);
</script>
