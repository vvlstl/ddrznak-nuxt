<template>
	<div class="page">
		<NuxtPage/>
	</div>
</template>
<script setup lang="ts">
	/**
	 * preload с crossorigin=anonymous обязателен для font/woff2, иначе браузер
	 * скачает шрифт повторно при парсинге @font-face.
	 */
	const fontBase = '/fonts/'
	const fontPreloads = computed(() => ([
		{
			rel: 'preload',
			href: `${fontBase}Montserrat-Bold.woff2`,
			as: 'font',
			type: 'font/woff2',
			crossorigin: 'anonymous'
		},
		{
			rel: 'preload',
			href: `${fontBase}Montserrat-Medium.woff2`,
			as: 'font',
			type: 'font/woff2',
			crossorigin: 'anonymous'
		},
		{
			rel: 'preload',
			href: `${fontBase}Montserrat-Regular.woff2`,
			as: 'font',
			type: 'font/woff2',
			crossorigin: 'anonymous'
		},
		{
			rel: 'preload',
			href: `${fontBase}Montserrat-Semibold.woff2`,
			as: 'font',
			type: 'font/woff2',
			crossorigin: 'anonymous'
		},
	]))

	const headData = computed(() => ({
		htmlAttrs: {
			lang: 'ru',
		},
		title: 'ГостзнакDDR-госномера. Дубликаты номерных знаков по всей России',
		link: [...fontPreloads.value],
	}))

	useHead(headData)
</script>
