<template>
	<div class="page">
		<Header/>
		<NuxtPage/>
		<Footer/>
		<AppPopups/>
	</div>
</template>
<script setup lang="ts">
	import AppPopups from "~/components/popup/AppPopups.vue";
	import Footer from "~/components/layout/Footer.vue";
	import Header from "~/components/layout/Header.vue";

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
		{
			rel: 'preload',
			href: `${fontBase}RoadNumbers.woff2`,
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
