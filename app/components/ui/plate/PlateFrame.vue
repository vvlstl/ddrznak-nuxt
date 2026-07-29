<template>
	<span class="frame" :class="frameClass">
		<slot/>
	</span>
</template>

<script setup lang="ts">
	import type { TPlateFrame } from '~/types/plate/TPlateColor.ts';

	type TComponentProps = {
		frame?: TPlateFrame;
	}

	const props = withDefaults(defineProps<TComponentProps>(), {
		frame: 'none',
	});

	const frameClass = computed(() => {
		if (props.frame === 'none') return '';
		return `frame--${props.frame}`;
	});

	console.debug('PlateFrame:mount', props);
</script>
