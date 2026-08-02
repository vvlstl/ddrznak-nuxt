<template>
	<div
		class="slider"
		:class="{
            [sliderName]: sliderName,
        }"
		ref="rootRef"
	>
		<slot name="header">
			<div v-if="$slots.header" class="slider__header">
				<SectionHeader :title="title" />

				<SliderArrows
					:block-name="sliderName"
					v-show="hasNavigation"
					ref="sliderArrowsRef"
				/>
			</div>
		</slot>

		<Swiper
			v-if="items?.length"
			class="slider__swiper"
			:class="{
                [sliderName + '__swiper']: sliderName,
            }"
			v-bind="swiperSettings"
			ref="swiperRef"
			@swiper="onSwiper"
			@zoomChange="onZoomChange"
			@slideChange="onSlideChange"
		>
			<SwiperSlide
				v-for="(item, index) in items"
				:key="item.id"
				class="slider__slide"
				:class="{
                    [sliderName + '__slide']: sliderName,
                }"
				:zoom="useZoom"
				v-slot="{isActive, isPrev, isNext, isVisible, isDuplicate }"
			>
				<slot
					name="slide"
					:item="item"
					:index="index"
					:is-active="isActive"
					:is-prev="isPrev"
					:is-next="isNext"
					:is-visible="isVisible"
					:is-duplicate="isDuplicate"
				/>
			</SwiperSlide>

			<slot name="pagination">
				<div
					v-if="$slots.pagination"
					class="slider__pagination"
					:class="{
                        [sliderName + '__pagination']: sliderName,
                    }"
				>
					<div ref="paginationRef"></div>
				</div>
			</slot>
		</Swiper>

		<slot name="arrows">
			<SliderArrows
				v-if="$slots.arrows"
				:block-name="sliderName"
				v-show="hasNavigation"
				ref="sliderArrowsRef"
			/>
		</slot>

		<slot name="footer"/>
	</div>
</template>

<script setup lang="ts">
	/**
	 * @see https://swiperjs.com/vue
	 */

	import {Swiper, SwiperSlide} from 'swiper/vue';
	import {EffectFade, Pagination, Navigation, Zoom, Thumbs} from 'swiper/modules';
	import type { SwiperOptions, Swiper as SwiperType } from 'swiper/types';

	import 'swiper/css';
	import 'swiper/css/effect-fade';
	import 'swiper/css/pagination';
	import 'swiper/css/navigation';
	import 'swiper/css/zoom';
	import 'swiper/css/thumbs';
	import type SliderArrows from "~/components/slider/SliderArrows.vue";
	import SectionHeader from "~/components/ui/SectionHeader.vue";

	type TSliderWrapper = {
		items: Record<string, any>[]; // элементы
		additionalSettings?: SwiperOptions; // дополнительные настройки swiper
		sliderName?: string, // класс слайдера
		title?: string, // заголовок слайдера
		useZoom?: boolean, // использовать ли зум в слайдере
		useClickNavigation?: boolean, // использовать ли клик-навигацию
	}

	const props = withDefaults(defineProps<TSliderWrapper>(), {
		items: () => [],
		additionalSettings: () => ({}),
		sliderName: '',
	});

	/**
	 * Template refs
	 */
	const swiperRef = useTemplateRef<InstanceType<typeof Swiper>>('swiperRef');
	const sliderArrowsRef = useTemplateRef<InstanceType<typeof SliderArrows>>('sliderArrowsRef');
	const paginationRef = useTemplateRef<HTMLElement>('paginationRef');

	/**
	 * Swiper settings
	 */
	const swiperInstance = ref<any>(null);

	const defaultSettings = reactive<SwiperOptions>({
		modules: [EffectFade, Pagination, Navigation, Zoom, Thumbs],
		slidesPerView: 'auto',
		spaceBetween: 0,
		grabCursor: props.items?.length > 1,
		navigation: false,
		pagination: false,
	});

	const swiperSettings = computed(() => {
		if (sliderArrowsRef.value) {
			defaultSettings.navigation = {
				enabled: true,
				prevEl: sliderArrowsRef.value?.btnPrev,
				nextEl: sliderArrowsRef.value?.btnNext,
			};
		}

		if (paginationRef.value) {
			defaultSettings.pagination = {
				clickable: true,
				el: paginationRef.value,
			};
		}

		return {...defaultSettings, ...props.additionalSettings} as Record<string, unknown>;
	});


	/**
	 * Swiper properties
	 */
	const hasNavigation = computed(() => {
		return !swiperRef.value?.hashNavigation;
	});

	const activeIndex = ref<number>(0);

	const realIndex = ref<number>(0);

	/**
	 * Swiper methods
	 */
	function slidePrev() {
		swiperInstance.value?.slidePrev();
	}

	function slideNext() {
		swiperInstance.value?.slideNext();
	}

	function slideTo(index: number) {
		swiperInstance.value?.slideTo(index);
	}

	/**
	 * Swiper events
	 */
	const emit = defineEmits<{
		(e: 'swiper', swiper: any): void,
		(e: 'slideChange', swiper: any): void,
		(e: 'zoomChange', swiper: any): void,
	}>();

	// initialized
	function onSwiper(swiper: SwiperType) {
		swiperInstance.value = swiper;
		activeIndex.value = swiper.activeIndex;
		realIndex.value = swiper.realIndex;
		emit('swiper', swiper);
	}

	// slide change
	function onSlideChange(swiper: SwiperType) {
		activeIndex.value = swiper.activeIndex;
		realIndex.value = swiper.realIndex;
		emit('slideChange', swiper);
	}

	// zoom change
	function onZoomChange(swiper: SwiperType) {
		emit('zoomChange', swiper);
	}

	/**
	 * Slots
	 */
	defineSlots<{
		header?: () => any,
		footer?: () => any,
		slide?: (props: {
			item: Record<string, any>,
			index: number,
			isActive: boolean,
			isPrev: boolean,
			isNext: boolean,
			isVisible: boolean,
			isDuplicate: boolean,
		}) => any,
		arrows?: () => any,
		pagination?: () => any,
		tools?: (props: {
			isZoomInEnabled: boolean,
			isZoomOutEnabled: boolean,
			zoomIn: () => void,
			zoomOut: () => void
		}) => any,
	}>();

	/**
	 * Define expose
	 */
	defineExpose({
		swiperRef,
		swiperInstance,

		activeIndex,
		realIndex,

		slidePrev,
		slideNext,
		slideTo,
	});

</script>

<style scoped>
:deep(.swiper) {
	overflow: var(--slider-overflow, hidden);
	border-radius: var(--swiper-border-radius, 0rem);
}

:deep(.swiper-slide) {
	width: var(--slide-width, calc((100% - (var(--slides-count, 1) - 1) * var(--slider-gap, var(--grid-gap))) / var(--slides-count, 1)));

	&:not(:last-child) {
		margin-right: var(--slider-gap, var(--grid-gap));
	}
}
</style>
