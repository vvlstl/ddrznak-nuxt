<template>
	<PopupWrapper name="gallery">
		<DetailGallery
			:items="items"
			:initial-slide="initialSlide"
			:use-zoom="useZoom"
			:use-full-screen="useFullScreen"
		/>
	</PopupWrapper>
</template>

<script setup lang="ts">
	import PopupWrapper from '~/components/popup/PopupWrapper.vue';
	import DetailGallery from '~/components/gallery/DetailGallery.vue';
	import type {TGalleryItem} from '~/types/gallery/TGalleryItem';

	withDefaults(defineProps<{
		items?: TGalleryItem[];
		initialSlide?: number;
		useZoom?: boolean;
		useFullScreen?: boolean;
	}>(), {
		items: () => [],
		initialSlide: 0,
		useZoom: true,
		useFullScreen: true,
	});
</script>
