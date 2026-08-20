<template>
	<article class="work-card">
		<div class="work-card__visual">
			<div class="work-card__visual-glow"/>
			<div class="work-card__picture">
				<NuxtPicture :src="item.srcImg"/>
			</div>
			<span class="work-card__type">Стандарт</span>
		</div>
		<div class="work-card__body">
			<div class="work-card__row">
				<div class="work-card__cell">
					<div class="work-card__label">Клиент</div>
					<div class="work-card__value">{{ item.client }}</div>
				</div>
				<div class="work-card__cell work-card__cell--right">
					<div class="work-card__label">Дата</div>
					<div class="work-card__value work-card__value--date">{{ item.date }}</div>
				</div>
			</div>
			<div class="work-card__car">
				<Icon name="tabler:car"/>
				{{ item.car }}
			</div>
		</div>
	</article>
</template>

<script setup lang="ts">
	import type {TWorkCard} from '~/types/works/TWorkCard.ts';

	type TComponentProps = {
		item: TWorkCard;
	}

	const props = defineProps<TComponentProps>();
</script>
