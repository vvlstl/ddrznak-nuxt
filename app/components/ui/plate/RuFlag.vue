<template>
	<span class="ru-flag" :style="flagStyle">
		<span class="ru-flag__band ru-flag__band--white"/>
		<span class="ru-flag__band ru-flag__band--blue"/>
		<span class="ru-flag__band ru-flag__band--red"/>
	</span>
</template>

<script setup lang="ts">
	type TComponentProps = {
		height?: number;
	}

	const props = withDefaults(defineProps<TComponentProps>(), {
		height: 18,
	});

	const flagStyle = computed(() => ({
		height: `${props.height}px`,
	}));

	console.debug('RuFlag:mount', props);
</script>
