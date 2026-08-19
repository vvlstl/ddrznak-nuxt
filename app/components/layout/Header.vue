<template>
	<header
		class="header"
		:class="{
			'header--fixed': isFixed,
			'header--menu-open': isMenuOpen,
		}"
		ref="root"
	>
		<div class="container">
			<nav class="header__container">
				<Logo class="header__logo"/>

				<ul class="header__nav">
					<li v-for="link in navLinks" :key="link.url">
						<a :href="link.url" class="link header__nav-link">{{ link.text }}</a>
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
					<button class="btn btn--square btn--white header__favourites-btn">
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
			</nav>
		</div>

		<transition name="slide">
			<BurgerMenu
				v-if="isMenuOpen"
				:menu="navLinks"
				@close="closeMenu"
				class="header__menu-burger"
			/>
		</transition>
	</header>
</template>

<script setup lang="ts">
	import Logo from "~/components/common/Logo.vue";
	import MenuIcon from "~/components/ui/MenuIcon.vue";
	import type {TLink} from "~/types/TLink.ts";
	import BurgerMenu from "~/components/layout/BurgerMenu.vue";

	const isFixed = ref(false);
	const isMenuOpen = ref<boolean>(false);
	const root = useTemplateRef<HTMLElement>('root');

	const navLinks: TLink[] = [
		{text: 'Преимущества', url: '#advantages'},
		{text: 'Работы', url: '#works'},
		{text: 'Конструктор', url: '#constructor'},
		{text: 'Процесс', url: '#process'},
		{text: 'Вопросы', url: '#faq'},
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

	watch(isMenuOpen, () => {
		lockScroll(isMenuOpen.value, root.value);
	});

	onBeforeUnmount(() => {
		window.removeEventListener('scroll', handleScroll);
	});

	onMounted(() => {
		window.addEventListener('scroll', handleScroll, {passive: true});
	});
</script>
