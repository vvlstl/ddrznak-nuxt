<template>
	<div class="works-slider">
		<div class="container">
			<div class="works-slider__container">
				<SliderTemplate
					:items="worksItems"
					blockName="Выполненные работы"
					title="Номера, которые мы<br>произвели за последний месяц"
					slider-name="works-slider"
					use-click-navigation
					ref="swiperRef"
				>
					<template #header></template>
					<template #slide="{ item }">
						<WorkCard :item="item"/>
					</template>
				</SliderTemplate>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import SliderTemplate from "~/components/slider/SliderTemplate.vue";
	import WorkCard from "~/components/sections/works-slider/WorkCard.vue";
	import type {TWorkCard} from '~/types/works/TWorkCard.ts';

	const worksItems: TWorkCard[] = [
		{
			id: 1,
			client: 'Частный клиент',
			car: 'Mercedes S-Class',
			date: '14.11.2024',
			srcImg: "/images/works-slider/1.webp",
		},
		{
			id: 2,
			client: 'Корпоративный парк',
			car: 'BMW 7 Series',
			date: '13.11.2024',
			srcImg: "/images/works-slider/2.webp"
		},
		{
			id: 3,
			client: 'Частный клиент',
			car: 'Audi A8',
			date: '13.11.2024',
			srcImg: "/images/works-slider/3.webp",
		},
		{
			id: 4,
			client: 'VIP-клиент клуба',
			car: 'Rolls-Royce Phantom',
			date: '12.11.2024',
			srcImg: "/images/works-slider/4.webp",
		},
		{
			id: 5,
			client: 'Таксопарк «Жёлтое»',
			car: 'Toyota Camry',
			date: '12.11.2024',
			srcImg: "/images/works-slider/5.webp",
		},
		{
			id: 6,
			client: 'Частный клиент',
			car: 'Porsche Cayenne',
			date: '11.11.2024',
			srcImg: "/images/works-slider/6.webp",
		},
		{
			id: 7,
			client: 'Бизнес-парк',
			car: 'Range Rover Autobiography',
			date: '11.11.2024',
			srcImg: "/images/works-slider/7.webp",
		},
		{
			id: 8,
			client: 'Военная часть',
			car: 'Урал-4320',
			date: '10.11.2024',
			srcImg: "/images/works-slider/8.webp",
		},
		{
			id: 9,
			client: 'Член клуба Premium-Park',
			car: 'Lexus LX 600',
			date: '10.11.2024',
			srcImg: "/images/works-slider/9.webp",
		},
		{
			id: 10,
			client: 'Частный клиент',
			car: 'Bentley Bentayga',
			date: '09.11.2024',
			srcImg: "/images/works-slider/10.webp"
		},
	];
</script>