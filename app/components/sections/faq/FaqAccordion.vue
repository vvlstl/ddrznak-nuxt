<template>
	<section id="faq" class="faq-section">
		<div class="faq-section__container">
			<div class="faq-section__grid">
				<div class="faq-section__aside">
					<span class="faq-section__eyebrow">Частые вопросы</span>
					<h2 class="faq-section__title">
						Отвечаем<br>клиентам
					</h2>
					<p class="faq-section__lead">
						За 12&nbsp;лет работы мы&nbsp;собрали и&nbsp;ответили на&nbsp;самые частые вопросы. Если ваш вопрос не&nbsp;вошёл в&nbsp;список&nbsp;— позвоните, мы&nbsp;на&nbsp;связи.
					</p>
					<div class="faq-section__contacts">
						<a href="tel:88002001234" class="faq-section__contact">
							<span class="faq-section__contact-icon">
								<Icon name="tabler:phone"/>
							</span>
							<span class="faq-section__contact-info">
								<span class="faq-section__contact-label">Линия 24/7</span>
								<span class="faq-section__contact-value">8 800 200-12-34</span>
							</span>
						</a>
						<a href="mailto:info@gosnomer-premium.ru" class="faq-section__contact">
							<span class="faq-section__contact-icon">
								<Icon name="tabler:mail"/>
							</span>
							<span class="faq-section__contact-info">
								<span class="faq-section__contact-label">Почта</span>
								<span class="faq-section__contact-value">info@gosnomer-premium.ru</span>
							</span>
						</a>
					</div>
				</div>

				<div class="faq-section__list">
					<FaqItem
						v-for="item in items"
						:key="item.id"
						:item="item"
						:is-open="openId === item.id"
						@toggle="onToggle"
					/>
				</div>
			</div>
		</div>
	</section>
</template>

<script setup lang="ts">
	import FaqItem from '~/components/partials/faq/FaqItem.vue';
	import type { TFaqItem } from '~/types/faq/TFaqItem.ts';

	const items: TFaqItem[] = [
		{
			id: 1,
			question: 'Это законно?',
			answer: 'Да, производство дубликатов государственных регистрационных знаков полностью законно при наличии у производителя аккредитации Минпромторга и сертификата соответствия ГОСТ Р 50577-2018. Мы работаем в правовом поле с 2012 года. Каждый изготовленный номер вносится в реестр и сопровождается документами.',
		},
		{
			id: 2,
			question: 'Какие документы нужны для заказа?',
			answer: 'Для заказа достаточно предоставить СТС (свидетельство о регистрации транспортного средства) и оригинал номера (или его остатки). Документы можно загрузить онлайн в личном кабинете или показать при самовывозе. Если оригинал утерян — оформляем через ГИБДД по упрощённой схеме.',
		},
		{
			id: 3,
			question: 'Сколько времени занимает изготовление?',
			answer: 'Стандартное время изготовления — 24 часа с момента подтверждения заявки и проверки документов. В премиум-центрах доступен экспресс-режим «за 4 часа». Для регионов доставка СДЭК занимает 2–4 дня в зависимости от удалённости.',
		},
		{
			id: 4,
			question: 'Можно ли заказать номер с любой комбинацией?',
			answer: 'Мы изготавливаем дубликаты — точные копии существующих номеров, выданных ГИБДД. Создание номера с новой произвольной комбинацией невозможно — это прерогатива государственной системы. Если вам нужен «красивый» номер, оформите его через ГИБДД, а у нас закажите качественный дубликат.',
		},
		{
			id: 5,
			question: 'Чем дубликат отличается от подделки?',
			answer: 'Дубликат — официальный экземпляр номера, изготовленный аккредитованным производителем с соблюдением всех стандартов ГОСТ и внесённый в реестр. Подделка — кустарная копия без сертификата, которая не проходит проверку сканерами ДПС и влечёт штраф или изъятие номеров. Наши дубликаты неотличимы от оригинала даже при инструментальном контроле.',
		},
		{
			id: 6,
			question: 'Что если номер повредился снова?',
			answer: 'На каждый номер действует гарантия 2 года от выцветания, отслоения плёнки и деформации. В течение гарантийного срока мы бесплатно заменим номер при factory-дефектах. Для участников клуба «Премиум-парк» действует бессрочная программа поддержки.',
		},
	];

	const openId = ref<number>(1);

	function onToggle(id: number) {
		openId.value = openId.value === id ? 0 : id;
		console.debug('FaqAccordion:toggle', id, openId.value);
	}
</script>
