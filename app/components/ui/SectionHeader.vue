<template>
	<div
		class="section-header"
		:class="{[`section-header--${theme}`]: theme}"
	>
		<div class="section-header__info">
			<div class="section-header__title-container">
				<div v-if="eyebrow" class="section-header__eyebrow">
					<span>{{ eyebrow }}</span>
					<span v-if="$slots['eyebrow-right']" class="section-header__eyebrow-right">
				<slot name="eyebrow-right"/>
			</span>
				</div>
				<h2 v-if="title" class="section-header__title" v-html="title"/>
			</div>

			<p v-if="lead" class="section-header__lead" v-html="lead"/>
		</div>
		<slot/>
	</div>
</template>

<script setup lang="ts">
	type TComponentProps = {
		eyebrow?: string;
		title?: string;
		lead?: string;
		theme?: string;
	}

	defineProps<TComponentProps>();
</script>
