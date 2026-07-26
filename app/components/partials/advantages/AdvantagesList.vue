<template>
	<div class="advantages-list">
		<AdvantageCard
			class="advantages-list__item"
			v-for="item in items"
			:key="item.id"
			:item="item"
		/>
	</div>
</template>

<script setup lang="ts">
	import type {TAdvantageCard} from "~/types/advantages/TAdvantageCard.ts";
	import AdvantageCard from "~/components/partials/advantages/AdvantageCard.vue";

	type TComponentProps = {
		items: TAdvantageCard[];
	}
	defineProps<TComponentProps>();
</script>