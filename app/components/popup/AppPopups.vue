<template>
	<component
		:is="popupMap[popup.name]"
		v-for="popup in popups"
		:key="popup.id"
		v-bind="popup.props"
		@closed="hide(popup.name)"
	/>
</template>
<script setup lang="ts">
	import GalleryDialog from '~/components/popup/GalleryDialog.vue';

	// Реестр попапов: имя → компонент. Расширяется по мере добавления попапов.
	const popupMap: Record<string, Component> = {
		gallery: markRaw(GalleryDialog),
	};

	const {popups, hide} = usePopup();
</script>
