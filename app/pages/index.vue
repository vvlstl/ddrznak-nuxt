<template>
	<div class="page">
		<TopStripe/>
		<AppHeader/>
		<main>
			<PromoBlock/>
			<TrustMarquee class="page__section"/>
			<AdvantagesSection class="page__section" :items="advantages"/>
			<WorksSlider class="page__section"/>
			<PlateConstructor class="page__section"/>
			<ProcessSteps class="page__section"/>
			<FaqAccordion class="page__section"/>
			<CtaSection class="page__section"/>
		</main>
		<AppFooter/>
	</div>
</template>

<script setup lang="ts">
	import PromoBlock from '~/components/sections/promo-block/PromoBlock.vue';
	import TopStripe from '~/components/sections/top-stripe/TopStripe.vue';
	import AppHeader from '~/components/sections/header/AppHeader.vue';
	import TrustMarquee from '~/components/sections/trust-marquee/TrustMarquee.vue';
	import WorksSlider from '~/components/sections/works-slider/WorksSlider.vue';
	import PlateConstructor from '~/components/sections/constructor/PlateConstructor.vue';
	import ProcessSteps from '~/components/sections/process/ProcessSteps.vue';
	import FaqAccordion from '~/components/sections/faq/FaqAccordion.vue';
	import CtaSection from '~/components/sections/cta/CtaSection.vue';
	import AppFooter from '~/components/sections/footer/AppFooter.vue';
	import type {TAdvantageCard} from '~/types/advantages/TAdvantageCard.ts';
	import AdvantagesSection from "~/components/sections/advantages/AdvantagesSection.vue";

	/** LCP-критичная секция (PromoBlock) импортируется статически.
	 * Остальные секции можно оборачивать в defineAsyncComponent —
	 * они уйдут в отдельные чанки и не блокируют initial render.
	 */

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
