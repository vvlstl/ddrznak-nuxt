<template>
	<div class="works-slider">
		<div class="container">
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
</template>

<script setup lang="ts">
	import SliderTemplate from "~/components/slider/SliderTemplate.vue";
	import WorkCard from "~/components/sections/works-slider/WorkCard.vue";
	import type {TWorkCard} from '~/types/works/TWorkCard.ts';

	const worksItems: TWorkCard[] = [
		{
			id: 1,
			num: 'А 777 АА',
			region: '77',
			type: 'white',
			frame: 'black',
			client: 'Частный клиент',
			car: 'Mercedes S-Class',
			date: '14.11.2024',
			n: '12 486'
		},
		{
			id: 2,
			num: 'В 001 ВВ',
			region: '777',
			type: 'white',
			frame: 'chrome',
			client: 'Корпоративный парк',
			car: 'BMW 7 Series',
			date: '13.11.2024',
			n: '12 485'
		},
		{
			id: 3,
			num: 'Е 925 ЕЕ',
			region: '199',
			type: 'white',
			frame: 'carbon',
			client: 'Частный клиент',
			car: 'Audi A8',
			date: '13.11.2024',
			n: '12 484'
		},
		{
			id: 4,
			num: 'К 100 КК',
			region: '750',
			type: 'white',
			frame: 'gold',
			client: 'VIP-клиент клуба',
			car: 'Rolls-Royce Phantom',
			date: '12.11.2024',
			n: '12 483'
		},
		{
			id: 5,
			num: 'Т 050 ТТ',
			region: '197',
			type: 'yellow',
			frame: 'none',
			client: 'Таксопарк «Жёлтое»',
			car: 'Toyota Camry',
			date: '12.11.2024',
			n: '12 482'
		},
		{
			id: 6,
			num: 'О 888 ОО',
			region: '99',
			type: 'white',
			frame: 'black',
			client: 'Частный клиент',
			car: 'Porsche Cayenne',
			date: '11.11.2024',
			n: '12 481'
		},
		{
			id: 7,
			num: 'Р 333 РР',
			region: '78',
			type: 'white',
			frame: 'chrome',
			client: 'Бизнес-парк',
			car: 'Range Rover Autobiography',
			date: '11.11.2024',
			n: '12 480'
		},
		{
			id: 8,
			num: 'С 001 СС',
			region: '147',
			type: 'black',
			frame: 'none',
			client: 'Военная часть',
			car: 'Урал-4320',
			date: '10.11.2024',
			n: '12 479'
		},
		{
			id: 9,
			num: 'М 050 ММ',
			region: '777',
			type: 'white',
			frame: 'carbon',
			client: 'Член клуба Premium-Park',
			car: 'Lexus LX 600',
			date: '10.11.2024',
			n: '12 478'
		},
		{
			id: 10,
			num: 'Н 700 НН',
			region: '198',
			type: 'white',
			frame: 'black',
			client: 'Частный клиент',
			car: 'Bentley Bentayga',
			date: '09.11.2024',
			n: '12 477'
		},
	];
</script>