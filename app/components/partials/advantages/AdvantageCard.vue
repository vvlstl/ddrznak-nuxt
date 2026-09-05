<template>
	<div class="advantage-card">
		<div class="advantage-card__icon">
			<Icon :name="item.icon"/>
		</div>
		<div class="advantage-card__info">
			<div class="advantage-card__title">
                <span
	                v-if="item.counter"
	                ref="counterRef"
	                :data-counter="item.counter"
	                v-html="item.title"
                />
				<span
					v-else
					v-html="item.title"
				/>
			</div>
			<div
				v-if="item.description"
				class="advantage-card__description"
				v-html="item.description"
			/>
		</div>
	</div>
</template>

<script setup lang="ts">
	import type {TAdvantageCard} from "~/types/advantages/TAdvantageCard.ts";
	import {useCounterAnimation} from '~/composables/useCounterAnimation';

	type TComponentProps = {
		item: TAdvantageCard;
	}
	defineProps<TComponentProps>();

	const counterRef = useTemplateRef<HTMLElement>('counterRef');
	useCounterAnimation(counterRef);
</script>