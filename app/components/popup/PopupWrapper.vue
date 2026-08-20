<template>
	<DialogRoot
		:open="isOpen"
		@update:open="onUpdateOpen"
	>
		<DialogPortal>
			<DialogOverlay class="popup__overlay"/>
			<DialogContent
				ref="contentRef"
				class="popup__content custom-scrollbar"
				:aria-label="name"
				data-scroll-lock-scrollable
			>
				<DialogClose
					class="btn btn--round popup__close"
					:aria-label="closeLabel"
				>
					<Icon name="tabler:x"/>
				</DialogClose>

				<slot/>
			</DialogContent>
		</DialogPortal>
	</DialogRoot>
</template>
<script setup lang="ts">
	import {DialogClose, DialogContent, DialogOverlay, DialogPortal, DialogRoot} from 'radix-vue';
	import {lockScroll} from '~/utils/scrollLock';

	type TComponentProps = {
		name: string;
		closeLabel?: string;
	};

	withDefaults(defineProps<TComponentProps>(), {
		closeLabel: 'Закрыть',
	});

	const emit = defineEmits<{
		opened: [];
		closed: [];
	}>();

	const isOpen = ref(true);
	const contentRef = ref<HTMLElement | null>(null);

	let scrollLocked = false;

	onMounted(async () => {
		await nextTick();
		lockScroll(true, contentRef.value);
		scrollLocked = true;
		emit('opened');
	});

	function releaseScroll() {
		if (!scrollLocked) return;

		lockScroll(false, contentRef.value);
		scrollLocked = false;
	}

	// Esc/клик вне контента/крестик приходят сюда как open=false из Radix Dialog
	function onUpdateOpen(open: boolean) {
		isOpen.value = open;
	}

	watch(isOpen, (open) => {
		if (!open) {
			emit('closed');
			nextTick(releaseScroll);
		}
	});

	onBeforeUnmount(releaseScroll);
</script>
