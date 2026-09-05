<template>
	<div class="burger-menu">
		<nav class="burger-menu__nav-container">
			<ul class="burger-menu__nav">
				<li class="burger-menu__item">
					<a class="link burger-menu__nav-link">Избранное</a>
				</li>
				<li v-for="link in menu" :key="link.url" class="burger-menu__item">
					<a
						:href="link.url"
						class="link burger-menu__nav-link"
						@click="onClick"
						v-html="link.text"
					/>
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

	function onClick() {
		emit('close');
	}
</script>
