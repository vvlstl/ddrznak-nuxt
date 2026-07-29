<template>
	<nav
		ref="navRef"
		class="app-header"
		:class="{ 'app-header--scrolled': isScrolled }"
	>
		<div class="app-header__container">
			<NuxtLink to="/" class="app-header__logo">
				<span class="app-header__logo-icon">Г</span>
				<span class="app-header__logo-text">
					<span class="app-header__logo-name">ГОСНОМЕР<span class="app-header__logo-dot">.</span>ПРЕМИУМ</span>
					<span class="app-header__logo-sub">DUBLIKAT • EST. 2012</span>
				</span>
			</NuxtLink>

			<ul class="app-header__nav">
				<li v-for="link in navLinks" :key="link.href">
					<a :href="link.href" class="app-header__nav-link">{{ link.label }}</a>
				</li>
			</ul>

			<div class="app-header__actions">
				<a href="tel:88002001234" class="app-header__phone">
					<Icon name="tabler:headset"/>
					8 800 200-12-34
				</a>
				<a href="#constructor" class="btn btn--primary">Создать номер</a>
			</div>
		</div>
	</nav>
</template>

<script setup lang="ts">
	const navRef = ref<HTMLElement | null>(null);
	const isScrolled = ref(false);

	const navLinks = [
		{ label: 'Преимущества', href: '#advantages' },
		{ label: 'Работы', href: '#works' },
		{ label: 'Конструктор', href: '#constructor' },
		{ label: 'Процесс', href: '#process' },
		{ label: 'Вопросы', href: '#faq' },
	];

	function handleScroll() {
		isScrolled.value = window.scrollY > 20;
	}

	onMounted(() => {
		window.addEventListener('scroll', handleScroll, { passive: true });
		console.debug('AppHeader:mount');
	});

	onUnmounted(() => {
		window.removeEventListener('scroll', handleScroll);
	});
</script>
