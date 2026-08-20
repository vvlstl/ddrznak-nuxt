<template>
	<div
		ref="root"
		class="detail-gallery"
		@click="onClick"
	>
		<div class="detail-gallery__tools">
			<button
				v-if="useZoom"
				type="button"
				class="btn btn--round detail-gallery__tool"
				:disabled="!isZoomInEnabled"
				aria-label="Приблизить"
				@click.stop="zoomIn"
			>
				<span class="btn__icon">
					<Icon name="tabler:zoom-in"/>
				</span>
			</button>

			<button
				v-if="useZoom"
				type="button"
				class="btn btn--round detail-gallery__tool"
				:disabled="!isZoomOutEnabled"
				aria-label="Отдалить"
				@click.stop="zoomOut"
			>
				<span class="btn__icon">
					<Icon name="tabler:zoom-out"/>
				</span>
			</button>

			<button
				v-if="useFullScreen"
				type="button"
				class="btn btn--round detail-gallery__tool"
				:aria-label="isFullScreen ? 'Выйти из полноэкранного режима' : 'Полноэкранный режим'"
				@click.stop="toggleFullscreen()"
			>
				<span class="btn__icon">
					<Icon :name="isFullScreen ? 'tabler:arrows-minimize' : 'tabler:arrows-maximize'"/>
				</span>
			</button>

			<button
				type="button"
				class="btn btn--round detail-gallery__tool"
				aria-label="Закрыть галерею"
				@click.stop="closeGallery"
			>
				<span class="btn__icon">
					<Icon name="tabler:x"/>
				</span>
			</button>
		</div>

		<div class="detail-gallery__main">
			<button
				v-show="hasNavigation"
				type="button"
				class="btn btn--round detail-gallery__prev"
				aria-label="Предыдущее изображение"
				@click.stop
			>
				<span class="btn__icon">
					<Icon name="tabler:arrow-left"/>
				</span>
			</button>

			<div class="detail-gallery__slider">
				<Swiper
					class="detail-gallery__swiper"
					v-bind="swiperParams"
					@swiper="onSwiper"
					@zoomChange="onZoomChange"
				>
					<SwiperSlide
						v-for="(item, index) in items"
						:key="index"
						:zoom="useZoom"
					>
						<div class="swiper-zoom-container">
							<div class="swiper-zoom-target">
								<NuxtPicture
									:src="item.picture.src"
									:alt="item.picture.alt ?? ''"
									:img-attrs="{ class: 'detail-gallery__image' }"
								/>
							</div>
						</div>
					</SwiperSlide>
				</Swiper>
			</div>

			<button
				v-show="hasNavigation"
				type="button"
				class="btn btn--round detail-gallery__next"
				aria-label="Следующее изображение"
				@click.stop
			>
				<span class="btn__icon">
					<Icon name="tabler:arrow-right"/>
				</span>
			</button>
		</div>
	</div>
</template>

<script setup lang="ts">
	import {Swiper, SwiperSlide} from 'swiper/vue';
	import {Keyboard, Navigation, Zoom} from 'swiper/modules';
	import debounce from 'debounce';
	import type {SwiperOptions, Swiper as SwiperType} from 'swiper/types';
	import type {TGalleryItem} from '~/types/gallery/TGalleryItem';

	import 'swiper/css';
	import 'swiper/css/zoom';
	import 'swiper/css/navigation';

	type TComponentProps = {
		items?: TGalleryItem[];
		initialSlide?: number;
		useZoom?: boolean;
		useFullScreen?: boolean;
	};

	const props = withDefaults(defineProps<TComponentProps>(), {
		items: () => [],
		initialSlide: 0,
		useZoom: true,
		useFullScreen: true,
	});

	const root = useTemplateRef<HTMLElement>('root');
	const swiperInstance = ref<SwiperType | null>(null);

	const hasNavigation = computed(() => props.items.length > 1);

	const swiperParams = computed<SwiperOptions>(() => ({
		modules: [Navigation, Zoom, Keyboard],
		navigation: {
			prevEl: '.detail-gallery__prev',
			nextEl: '.detail-gallery__next',
		},
		initialSlide: props.initialSlide,
		zoom: props.useZoom,
		keyboard: {
			enabled: true,
		},
	}));

	function onSwiper(swiper: SwiperType) {
		swiperInstance.value = swiper;
	}

	// Zoom
	const minZoom = 1;
	const maxZoom = 8;
	const zoomStep = 2;

	const zoom = ref(1);

	function onZoomChange(_swiper: SwiperType, scale: number) {
		zoom.value = scale;
	}

	const isZoomOutEnabled = computed(() => zoom.value - zoomStep >= minZoom);

	const isZoomInEnabled = computed(() => zoom.value + zoomStep <= maxZoom);

	function zoomIn() {
		swiperInstance.value?.zoom?.in(zoom.value + zoomStep);
	}

	function zoomOut() {
		const newZoom = zoom.value - zoomStep;

		if (newZoom === minZoom) {
			swiperInstance.value?.zoom?.out();
			return;
		}

		swiperInstance.value?.zoom?.in(newZoom);
	}

	// FullScreen
	const isFullScreen = ref(false);

	function toggleFullscreen(state?: boolean) {
		const target = state ?? !isFullScreen.value;
		isFullScreen.value = target;

		if (target) {
			root.value?.requestFullscreen?.();
		} else if (document.fullscreenElement) {
			document.exitFullscreen();
		}
	}

	function onFullscreenChange() {
		isFullScreen.value = !!document.fullscreenElement;
	}

	onMounted(() => {
		document.addEventListener('fullscreenchange', onFullscreenChange);
	});

	onBeforeUnmount(() => {
		document.removeEventListener('fullscreenchange', onFullscreenChange);
		checkClickDebounced.clear();
	});

	// Закрытие / клики
	const {hide} = usePopup();

	function closeGallery() {
		hide('gallery');
	}

	const lastClickTime = ref(Date.now());
	const lastClickDiff = ref(0);

	// Одиночный клик перелистывает слайд, если нет зума
	function checkClick() {
		const isZoomed = (swiperInstance.value?.zoom?.scale ?? 1) > 1;

		if (lastClickDiff.value > 300 && !isZoomed) {
			if (!swiperInstance.value?.isLocked) {
				swiperInstance.value?.slideNext();
			}
		}
	}

	const checkClickDebounced = debounce(checkClick, 300);

	function onClick(ev: MouseEvent) {
		// Swiper генерирует синтетическое событие при клике — игнорируем его
		if (!ev.isTrusted) return;

		const currentTime = Date.now();

		lastClickDiff.value = currentTime - lastClickTime.value;
		lastClickTime.value = currentTime;

		// Клик вне изображения закрывает галерею
		const tags = ['PICTURE', 'IMG', 'FIGURE', 'FIGCAPTION'];
		const target = ev.target as HTMLElement;

		if (!tags.includes(target.tagName) && !target.closest('.btn')) {
			closeGallery();
			return;
		}

		if (props.useZoom) checkClickDebounced();
	}
</script>
