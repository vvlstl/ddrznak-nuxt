<template>
	<footer class="footer">
		<div class="footer__container">
			<div class="footer__top">
				<div class="footer__brand">
					<NuxtLink to="/public" class="footer__logo">
						<span class="footer__logo-icon">Г</span>
						<span class="footer__logo-text">
							<span class="footer__logo-name">ГОСНОМЕР<span class="footer__logo-dot">.</span>ПРЕМИУМ</span>
							<span class="footer__logo-sub">DUBLIKAT • EST. 2012</span>
						</span>
					</NuxtLink>
					<p class="footer__about">
						Официальный аккредитованный производитель дубликатов государственных регистрационных знаков. Работаем с 2012 года в 85 регионах России.
					</p>
					<div class="footer__socials">
						<a
							v-for="s in socials"
							:key="s.icon"
							:href="s.href"
							class="footer__social"
							:aria-label="s.label"
						>
							<Icon :name="s.icon"/>
						</a>
					</div>
				</div>

				<div
					v-for="col in columns"
					:key="col.title"
					class="footer__col"
				>
					<div class="footer__col-title">{{ col.title }}</div>
					<ul class="footer__list">
						<li v-for="item in col.items" :key="item.label">
							<a :href="item.href" class="footer__link">{{ item.label }}</a>
						</li>
					</ul>
				</div>
			</div>

			<div class="footer__bottom">
				<div class="footer__copy">
					© 2012–2025 ГОСНОМЕР.ПРЕМИУМ • ИНН 7728XXXXXX • ОГРН 1127746XXXXXX
				</div>
				<div class="footer__legal">
					<a href="#" class="footer__link">Политика конфиденциальности</a>
					<a href="#" class="footer__link">Оферта</a>
					<a href="#" class="footer__link">Реквизиты</a>
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
				{ label: 'Легковые номера', href: '#works' },
				{ label: 'Мото-номера', href: '#works' },
				{ label: 'Прицепы', href: '#works' },
				{ label: 'Трактора', href: '#works' },
				{ label: 'Дипломатические', href: '#works' },
			],
		},
		{
			title: 'Компания',
			items: [
				{ label: 'О нас', href: '#works' },
				{ label: 'Сертификаты', href: '#works' },
				{ label: 'Производство', href: '#works' },
				{ label: 'Партнёрам', href: '#works' },
				{ label: 'Вакансии', href: '#works' },
			],
		},
		{
			title: 'Клиентам',
			items: [
				{ label: 'Конструктор', href: '#constructor' },
				{ label: 'Доставка', href: '#works' },
				{ label: 'Оплата', href: '#works' },
				{ label: 'Гарантия', href: '#works' },
				{ label: 'Клуб Premium-Park', href: '#works' },
			],
		},
		{
			title: 'Контакты',
			items: [
				{ label: 'Москва, ул. Производственная 12к3', href: '#works' },
				{ label: '8 800 200-12-34', href: 'tel:88002001234' },
				{ label: 'Ежедневно, 08:00–22:00', href: '#works' },
				{ label: 'info@gosnomer-premium.ru', href: 'mailto:info@gosnomer-premium.ru' },
			],
		},
	];

	const socials = [
		{ icon: 'tabler:brand-telegram', href: '#works', label: 'Telegram' },
		{ icon: 'tabler:brand-vk', href: '#works', label: 'ВКонтакте' },
		{ icon: 'tabler:brand-youtube', href: '#works', label: 'YouTube' },
		{ icon: 'tabler:brand-whatsapp', href: '#works', label: 'WhatsApp' },
	];

	console.debug('AppFooter:mount');
</script>
