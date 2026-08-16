<template>
	<nav
		ref="navRef"
		class="app-header"
		:class="{'app-header--scrolled': isScrolled}"
	>
		<div class="container">
			<div class="app-header__container">
				<NuxtLink to="/" class="app-header__logo">
					<Logo/>
				</NuxtLink>

				<ul class="app-header__nav">
					<li v-for="link in navLinks" :key="link.href">
						<a :href="link.href" class="app-header__nav-link">{{ link.label }}</a>
					</li>
				</ul>

				<div class="app-header__actions">
					<button class="btn btn--secondary">
						<span class="btn__text">Войти</span>
						<span class="btn__icon">
						<Icon name="tabler:login"/>
					</span>
					</button>
					<button class="btn btn--square btn--white">
					<span class="btn__icon">
						<Icon name="tabler:heart-filled"/>
					</span>
					</button>
					<button class="btn btn--square btn--white">
					<span class="btn__icon">
						<Icon name="tabler:shopping-cart-filled"/>
					</span>
					</button>
				</div>
			</div>
		</div>
	</nav>
</template>

<script setup lang="ts">
	import Logo from "~/components/common/Logo.vue";

	const navRef = ref<HTMLElement | null>(null);
	const isScrolled = ref(false);

	const navLinks = [
		{label: 'Преимущества', href: '#advantages'},
		{label: 'Работы', href: '#works'},
		{label: 'Конструктор', href: '#constructor'},
		{label: 'Процесс', href: '#process'},
		{label: 'Вопросы', href: '#faq'},
	];

	function handleScroll() {
		isScrolled.value = window.scrollY > 20;
	}

	onMounted(() => {
		window.addEventListener('scroll', handleScroll, {passive: true});
		console.debug('AppHeader:mount');
	});

	onUnmounted(() => {
		window.removeEventListener('scroll', handleScroll);
	});
</script>
