<template>
	<main>
		<PromoBlock/>
		<TrustMarquee class="page__section"/>
		<AdvantagesSection
			id="advantages"
			class="page__section reveal"
			:items="advantages"
		/>
		<WorksSlider id="works" class="page__section reveal"/>
		<PlateConstructor id="constructor" class="page__section reveal"/>
		<ProcessSteps id="process" class="page__section reveal"/>
		<FaqAccordion id="faq" class="page__section reveal"/>
		<CtaSection class="page__section"/>
	</main>
</template>

<script setup lang="ts">
	import PromoBlock from '~/components/sections/promo-block/PromoBlock.vue';
	import type {TAdvantageCard} from '~/types/advantages/TAdvantageCard.ts';

	// LCP-критичная секция импортируется статически.
	// Остальные уходят в отдельные чанки и не блокируют initial render.
	const TrustMarquee = defineAsyncComponent(
		() => import('~/components/sections/trust-marquee/TrustMarquee.vue')
	);
	const AdvantagesSection = defineAsyncComponent(
		() => import('~/components/sections/advantages/AdvantagesSection.vue')
	);
	const WorksSlider = defineAsyncComponent(
		() => import('~/components/sections/works-slider/WorksSlider.vue')
	);
	const PlateConstructor = defineAsyncComponent(
		() => import('~/components/sections/constructor/PlateConstructor.vue')
	);
	const ProcessSteps = defineAsyncComponent(
		() => import('~/components/sections/process/ProcessSteps.vue')
	);
	const FaqAccordion = defineAsyncComponent(
		() => import('~/components/sections/faq/FaqAccordion.vue')
	);
	const CtaSection = defineAsyncComponent(
		() => import('~/components/sections/cta/CtaSection.vue')
	);

	const advantages: TAdvantageCard[] = [
		{
			id: 1,
			index: '01',
			icon: 'tabler:shield-check',
			title: 'Полная легальность',
			description: 'Производство аккредитовано Минпромторгом. Каждый номер имеет сертификат соответствия ГОСТ Р 50577-2018 и вносится в реестр выданных дубликатов.',
		},
		{
			id: 2,
			index: '02',
			icon: 'tabler:bolt',
			title: 'Производство за 1 день',
			description: 'Стандартное время изготовления — 24 часа с момента подтверждения заказа. Экспресс-режим за 4 часа доступен в любом из 12 фирменных центров.',
		},
		{
			id: 3,
			index: '03',
			icon: 'tabler:diamond',
			title: 'Премиальные материалы',
			description: 'Алюминиевая основа 1.0 мм, светоотражающая плёнка 3M™ серии 1170, устойчивая к ультрафиолету и реагентам. Срок службы — 10+ лет без выцветания.',
		},
		{
			id: 4,
			index: '04',
			icon: 'tabler:chart-dots',
			title: 'Шесть ступеней контроля',
			description: 'Проверка соответствия оригиналу по 14 параметрам: габариты, шрифт, высота символов, шаг элементов, светоотражение, читаемость на сканерах ДПС.',
		},
		{
			id: 5,
			index: '05',
			icon: 'tabler:truck-delivery',
			title: 'Доставка по России',
			description: 'Курьерская доставка в 85 регионов РФ. В Москве — бесплатная доставка в день готовности. Возможен самовывоз из 12 центров.',
		},
		{
			id: 6,
			index: '06',
			icon: 'tabler:heart-handshake',
			title: 'Программа лояльности',
			description: 'Члены клуба «Премиум-парк» получают приоритетное производство, кешбэк 7% и персонального менеджера. Доступ открыт после третьего заказа.',
		},
	];
</script>
