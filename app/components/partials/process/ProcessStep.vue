<template>
	<div class="process-step">
		<div class="process-step__num">{{ item.step }}</div>
		<div class="process-step__tag">{{ item.tag }}</div>
		<h3 class="process-step__title">{{ item.title }}</h3>
		<p class="process-step__description">{{ item.description }}</p>
	</div>
</template>

<script setup lang="ts">
	import type { TProcessStep } from '~/types/process/TProcessStep.ts';

	type TComponentProps = {
		item: TProcessStep;
	}
	defineProps<TComponentProps>();
</script>
