<template>
	<span
		class="plate"
		:class="plateClass"
		:style="plateStyle"
	>
		<span class="plate__char">{{ combination.letterFirst || '·' }}</span>
		<span class="plate__char">{{ combination.digits || '···' }}</span>
		<span class="plate__char">{{ combination.lettersLast || '··' }}</span>
		<span class="plate__divider"/>
		<span class="plate__region">
			<span class="plate__char plate__char--region" :style="charRegionStyle">{{ combination.region || '···' }}</span>
			<span class="plate__rus">
				<RuFlag :height="flagHeight"/>
				<span class="plate__rus-text">RUS</span>
			</span>
		</span>
	</span>
</template>

<script setup lang="ts">
	import RuFlag from '~/components/ui/plate/RuFlag.vue';
	import type { TPlateColor, TPlateCombination } from '~/types/plate/TPlateColor.ts';

	type TComponentProps = {
		combination: TPlateCombination;
		color?: TPlateColor;
		fontSize?: number;
		flagHeight?: number;
	}

	const props = withDefaults(defineProps<TComponentProps>(), {
		color: 'white',
		fontSize: 44,
		flagHeight: 11,
	});

	const plateClass = computed(() => {
		if (props.color === 'white') return '';
		return `plate--${props.color}`;
	});

	const plateStyle = computed(() => ({
		fontSize: `${props.fontSize}px`,
	}));

	const charRegionStyle = computed(() => ({
		fontSize: `${Math.round(props.fontSize * 0.7)}px`,
	}));

	console.debug('PlatePreview:mount', props);
</script>
