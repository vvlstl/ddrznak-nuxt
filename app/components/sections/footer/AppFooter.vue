<template>
	<footer class="app-footer">
		<div class="app-footer__container">
			<div class="app-footer__top">
				<div class="app-footer__brand">
					<NuxtLink to="/" class="app-footer__logo">
						<span class="app-footer__logo-icon">Г</span>
						<span class="app-footer__logo-text">
							<span class="app-footer__logo-name">ГОСНОМЕР<span class="app-footer__logo-dot">.</span>ПРЕМИУМ</span>
							<span class="app-footer__logo-sub">DUBLIKAT • EST. 2012</span>
						</span>
					</NuxtLink>
					<p class="app-footer__about">
						Официальный аккредитованный производитель дубликатов государственных регистрационных знаков. Работаем с 2012 года в 85 регионах России.
					</p>
					<div class="app-footer__socials">
						<a
							v-for="s in socials"
							:key="s.icon"
							:href="s.href"
							class="app-footer__social"
							:aria-label="s.label"
						>
							<Icon :name="s.icon"/>
						</a>
					</div>
				</div>

				<div
					v-for="col in columns"
					:key="col.title"
					class="app-footer__col"
				>
					<div class="app-footer__col-title">{{ col.title }}</div>
					<ul class="app-footer__list">
						<li v-for="item in col.items" :key="item.label">
							<a :href="item.href" class="app-footer__link">{{ item.label }}</a>
						</li>
					</ul>
				</div>
			</div>

			<div class="app-footer__bottom">
				<div class="app-footer__copy">
					© 2012–2025 ГОСНОМЕР.ПРЕМИУМ • ИНН 7728XXXXXX • ОГРН 1127746XXXXXX
				</div>
				<div class="app-footer__legal">
					<a href="#" class="app-footer__link">Политика конфиденциальности</a>
					<a href="#" class="app-footer__link">Оферта</a>
					<a href="#" class="app-footer__link">Реквизиты</a>
				</div>
			</div>
		</div>
	</footer>
</template>

<script setup lang="ts">
	type TFooterLink = {
		label: string;
		href: string;
	};

	type TFooterColumn = {
		title: string;
		items: TFooterLink[];
	};

	const columns: TFooterColumn[] = [
		{
			title: 'Услуги',
			items: [
				{ label: 'Легковые номера', href: '#' },
				{ label: 'Мото-номера', href: '#' },
				{ label: 'Прицепы', href: '#' },
				{ label: 'Трактора', href: '#' },
				{ label: 'Дипломатические', href: '#' },
			],
		},
		{
			title: 'Компания',
			items: [
				{ label: 'О нас', href: '#' },
				{ label: 'Сертификаты', href: '#' },
				{ label: 'Производство', href: '#' },
				{ label: 'Партнёрам', href: '#' },
				{ label: 'Вакансии', href: '#' },
			],
		},
		{
			title: 'Клиентам',
			items: [
				{ label: 'Конструктор', href: '#constructor' },
				{ label: 'Доставка', href: '#' },
				{ label: 'Оплата', href: '#' },
				{ label: 'Гарантия', href: '#' },
				{ label: 'Клуб Premium-Park', href: '#' },
			],
		},
		{
			title: 'Контакты',
			items: [
				{ label: 'Москва, ул. Производственная 12к3', href: '#' },
				{ label: '8 800 200-12-34', href: 'tel:88002001234' },
				{ label: 'Ежедневно, 08:00–22:00', href: '#' },
				{ label: 'info@gosnomer-premium.ru', href: 'mailto:info@gosnomer-premium.ru' },
			],
		},
	];

	const socials = [
		{ icon: 'tabler:brand-telegram', href: '#', label: 'Telegram' },
		{ icon: 'tabler:brand-vk', href: '#', label: 'ВКонтакте' },
		{ icon: 'tabler:brand-youtube', href: '#', label: 'YouTube' },
		{ icon: 'tabler:brand-whatsapp', href: '#', label: 'WhatsApp' },
	];

	console.debug('AppFooter:mount');
</script>
