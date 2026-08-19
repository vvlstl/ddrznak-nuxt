<template>
	<div class="burger-menu">
		<nav class="burger-menu__nav-container">
			<ul class="burger-menu__nav">
				<li class="burger-menu__item">
					<a class="link burger-menu__nav-link">Избранное</a>
				</li>
				<li class="burger-menu__item" v-for="link in menu" :key="link.url">
					<a :href="link.url" class="link burger-menu__nav-link">{{ link.text }}</a>
				</li>
			</ul>
		</nav>
	</div>
</template>

<script setup lang="ts">

	import type {TLink} from "~/types/TLink.ts";

	type TComponentProps = {
		menu: TLink[];
	};

	defineProps<TComponentProps>();

	const emit = defineEmits<{
		close: [];
	}>();

	function onClick(url: string) {
		emit('close');
		const el = document.querySelector(url);
		if (el) {
			el.scrollIntoView({behavior: 'smooth'});
		}
	}
</script>
