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
					<NuxtImg src="/images/promo-block/car.webp"/>
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

	const advantages = [
		{
			id: 1,
			icon: 'tabler:bolt',
			title: 'Быстро',
			description: 'Срок изготовления&nbsp;&mdash; от&nbsp;15&nbsp;до&nbsp;30&nbsp;минут',
		},
		{
			id: 2,
			icon: 'tabler:rosette-discount-check',
			title: 'Законно',
			description: 'Соответствуем ГОСТ и&nbsp;требованиям ГИБДД',
		},
		{
			id: 3,
			icon: 'tabler:award',
			title: 'Качественно',
			description: 'Премиальные материалы и&nbsp;контроль качества',
		},
		{
			id: 4,
			icon: 'tabler:clock-24',
			title: 'Всегда на&nbsp;связи',
			description: 'Работаем без выходных, включая праздники.',
		}
	];
</script>