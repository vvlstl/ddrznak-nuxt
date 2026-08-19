<template>
	<nav
		ref="navRef"
		class="header"
		:class="{'header--fixed': isFixed}"
	>
		<div class="container">
			<div class="header__container">
				<NuxtLink to="/" class="header__logo">
					<Logo/>
				</NuxtLink>

				<ul class="header__nav">
					<li v-for="link in navLinks" :key="link.href">
						<a :href="link.href" class="header__nav-link">{{ link.label }}</a>
					</li>
				</ul>

				<div class="header__actions">
					<button class="btn btn--secondary header__login-btn">
						<span class="btn__text">Войти</span>
						<span class="btn__icon">
							<Icon name="tabler:login"/>
						</span>
					</button>
					<button class="btn btn--square btn--white header__user-btn">
						<span class="btn__icon">
							<Icon name="tabler:user-circle"/>
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
					<button
						class="btn btn--square btn--white header__menu-btn"
						@click.prevent="toggleMenu()"
					>
						<span class="btn__icon">
							<MenuIcon :is-cross="isMenuOpen"/>
						</span>
					</button>
				</div>
			</div>
		</div>
	</nav>
</template>

<script setup lang="ts">
	import Logo from "~/components/common/Logo.vue";
	import MenuIcon from "~/components/ui/MenuIcon.vue";

	const navRef = ref<HTMLElement | null>(null);
	const isFixed = ref(false);
	const isMenuOpen = ref<boolean>(false);

	const navLinks = [
		{label: 'Преимущества', href: '#advantages'},
		{label: 'Работы', href: '#works'},
		{label: 'Конструктор', href: '#constructor'},
		{label: 'Процесс', href: '#process'},
		{label: 'Вопросы', href: '#faq'},
	];

	function handleScroll() {
		isFixed.value = window.scrollY > 20;
	}
	function toggleMenu() {
		isMenuOpen.value = !isMenuOpen.value
	}

	function closeMenu() {
		isMenuOpen.value = false
	}

	onMounted(() => {
		window.addEventListener('scroll', handleScroll, {passive: true});
		console.debug('AppHeader:mount');
	});

	onUnmounted(() => {
		window.removeEventListener('scroll', handleScroll);
	});
</script>
