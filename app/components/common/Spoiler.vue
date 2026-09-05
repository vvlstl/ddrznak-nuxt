<template>
	<div
		ref="container"
		class="spoiler"
		:class="{
            'spoiler--open': isOpen,
        }"
		:style="{
            '--content-height': spoilerHeight === null ? 'auto' : spoilerHeight + 'px',
            '--spoiler-speed': speed + 'ms',
        }"
		@transitionend="onTransitionEnd"
	>
		<div ref="content" class="spoiler__content">
			<slot/>
		</div>
	</div>
</template>

<script setup lang="ts">

	import {useResizeObserver} from "~/composables/useResizeObserver.ts";

	type TComponentProps = {
		isOpen: boolean,
		speed?: number,
		// Приходится иногда програмно переключать,
		// так как в спойлере может быть контент с тенью или отрицательными марджинами, которые обрезаются
		useOverflowVisible?: boolean,
	};

	const props = defineProps<TComponentProps>();

	const container = useTemplateRef<HTMLElement>('container');
	const content = useTemplateRef<HTMLElement>('content');

	const contentHeight = ref<number>(0);
	const spoilerHeight = ref<null | number>(props.isOpen ? null : 0);

	function onResize() {
		contentHeight.value = content.value?.offsetHeight || 0;
	}

	useResizeObserver(onResize, 400, true, true, container);
	useResizeObserver(onResize, 400, true, true, content);

	const speed = computed(() => {
		return props.speed ?? Math.max(1.2 * contentHeight.value, 400);
	});

	function onBeforeOpen() {
		if (props.useOverflowVisible && container.value) {
			container.value.style.overflow = 'hidden';
		}

		spoilerHeight.value = contentHeight.value;
	}

	function onAfterOpen() {
		if (props.useOverflowVisible && container.value) {
			container.value.style.overflow = 'visible';
		}

		spoilerHeight.value = null;
	}

	function onBeforeClose() {
		if (props.useOverflowVisible && container.value) {
			container.value.style.overflow = 'hidden';
		}

		spoilerHeight.value = contentHeight.value;

		setTimeout(() => {
			spoilerHeight.value = 0;
		}, 10);
	}

	function onTransitionEnd(ev: TransitionEvent) {
		if (ev.propertyName === 'height'  && ev.target === container.value) {
			props.isOpen ? onAfterOpen() : {};
		}
	}

	watch(() => props.isOpen, () => {
		props.isOpen ? onBeforeOpen() : onBeforeClose();
	});

	onMounted(() => {
		if (props.isOpen && props.useOverflowVisible && container.value) {
			container.value.style.overflow = 'visible';
		}
	});
</script>
