<template>
	<div class="advantage-card">
		<div class="advantage-card__icon">
			<Icon :name="item.icon"/>
		</div>
		<div class="advantage-card__info">
			<div class="advantage-card__title" v-html="item.title"/>
			<div class="advantage-card__description" v-html="item.description"/>
		</div>
	</div>
</template>
<script setup lang="ts">
	import type {TAdvantageCard} from "~/types/advantages/TAdvantageCard.ts";

	type TComponentProps = {
		item: TAdvantageCard;
	}
	defineProps<TComponentProps>();
</script>
