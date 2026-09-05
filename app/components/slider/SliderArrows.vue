<template>
	<div
		class="slider-arrows"
		:class="{[blockName + '__arrows']: blockName}"
	>
		<button
			ref="btnPrev"
			class="btn btn--square"
			:class="{
                [blockName + '__prev']: blockName,
                ['btn--' + color]: color,
            }"
		>
			<span class="btn__icon">
				<Icon name="tabler:arrow-left"/>
			</span>
		</button>

		<button
			ref="btnNext"
			class="btn btn--square"
			:class="{
                [blockName + '__next']: blockName,
                ['btn--' + color]: color,
            }"
		>
			<span class="btn__icon">
				<Icon name="tabler:arrow-right"/>
			</span>
		</button>
	</div>
</template>

<script setup lang="ts">
	type TComponentProps = {
		blockName?: string,
		color?: string,
	};

	withDefaults(defineProps<TComponentProps>(), {
		blockName: 'slider',
		color: 'white',
	});

	const btnPrev = useTemplateRef<HTMLButtonElement>('btnPrev');
	const btnNext = useTemplateRef<HTMLButtonElement>('btnNext');

	defineExpose({
		btnPrev,
		btnNext,
	});

</script>
