<template>
	<section class="trust-marquee">
		<div class="trust-marquee__track" aria-hidden="true">
			<span
				v-for="(item, i) in items"
				:key="'m' + i"
				class="trust-marquee__item"
			>
				<Icon name="tabler:certificate"/>
				{{ item.text }}
			</span>
			<!-- дубликат для бесшовного цикла -->
			<span
				v-for="(item, i) in items"
				:key="'md' + i"
				class="trust-marquee__item"
			>
				<Icon name="tabler:certificate"/>
				{{ item.text }}
			</span>
		</div>
	</section>
</template>

<script setup lang="ts">
	type TMarqueeItem = {
		icon: string;
		text: string;
	}

	const items: TMarqueeItem[] = [
		{ icon: 'tabler:certificate', text: 'Сертификат соответствия ГОСТ Р' },
		{ icon: 'tabler:building-factory', text: 'Аккредитация Минпромторга' },
		{ icon: 'tabler:id', text: 'Регистрация в реестре ГИБДД' },
		{ icon: 'tabler:shield-check', text: 'Гарантия 2 года на каждую пластину' },
		{ icon: 'tabler:truck-delivery', text: 'Доставка по 85 регионам РФ' },
		{ icon: 'tabler:stamp', text: 'Заводская штамповка и фотоэкспозиция' },
	];

	console.debug('TrustMarquee:mount');
</script>
