<template>
	<section class="promo-block">
		<div class="container">
			<div class="promo-block__content">
				<div class="promo-block__info">
					<div class="promo-block__title">Красивые номера<br>для вашего автомобиля</div>
					<div class="promo-block__description">
						Дубликаты номерных знаков по&nbsp;всей России. Собственное производство, никаких посредников.
					</div>
				</div>
				<div class="promo-block__picture">
					<NuxtPicture src="/images/promo-block/car.webp"/>
				</div>
			</div>
			<div class="promo-block__advantages">
				<AdvantagesList :items="advantages"/>
			</div>
		</div>
	</section>
</template>

<script setup lang="ts">

	//TODO для верстки

	import AdvantagesList from "~/components/partials/advantages/AdvantagesList.vue";
	import type {TAdvantageCard} from "~/types/advantages/TAdvantageCard.ts";

	const advantages: TAdvantageCard[] = [
		{
			id: 1,
			icon: 'tabler:calendar-stats',
			title: '2&nbsp;года',
			counter: '2 года',
			description: 'на&nbsp;рынке',
		},
		{
			id: 2,
			icon: 'tabler:users',
			title: '+128k',
			counter: '+128k',
			description: 'довольных клиентов',
		},
		{
			id: 3,
			icon: 'tabler:clock-bolt',
			title: '15&nbsp;мин',
			counter: '15 мин',
			description: 'среднее время выдачи',
		},
		{
			id: 4,
			icon: 'tabler:star',
			title: '4.9',
			counter: '4.9',
			description: '8&nbsp;432 отзыва',
		},
	];
</script>