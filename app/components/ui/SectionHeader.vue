<template>
	<div class="section-header">
		<div v-if="eyebrow" class="section-header__eyebrow">
			<span>{{ eyebrow }}</span>
			<span v-if="$slots['eyebrow-right']" class="section-header__eyebrow-right">
				<slot name="eyebrow-right"/>
			</span>
		</div>
		<h2 v-if="title" class="section-header__title" v-html="title"/>
		<p v-if="lead" class="section-header__lead">{{ lead }}</p>
		<slot/>
	</div>
</template>

<script setup lang="ts">
	type TComponentProps = {
		eyebrow?: string;
		title?: string;
		lead?: string;
	}

	defineProps<TComponentProps>();
</script>
