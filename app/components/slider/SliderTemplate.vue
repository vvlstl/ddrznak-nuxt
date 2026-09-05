<template>
	<div
		ref="rootRef"
		class="slider"
		:class="sliderName && `${sliderName}__swiper-container`"
	>
		<slot name="header">
			<div
				v-if="$slots.header"
				class="slider__header"
				:class="sliderName && `${sliderName}__swiper-header`"
			>
				<SectionHeader
					:title="title"
					:eyebrow="blockName"
					theme="w-100"
				/>

				<SliderArrows
					v-show="hasNavigation"
					ref="sliderArrowsRef"
					:block-name="sliderName"
					:color="themeBtn"
				/>
			</div>
		</slot>

		<Swiper
			v-if="items.length"
			ref="swiperRef"
			class="slider__swiper"
			:class="sliderName && `${sliderName}__swiper`"
			v-bind="swiperSettings"
			@swiper="onSwiper"
			@slide-change="onSlideChange"
			@zoom-change="onZoomChange"
		>
			<SwiperSlide
				v-for="(item, index) in items"
				:key="item.id"
				v-slot="{
					isActive,
					isPrev,
					isNext,
					isVisible,
					isDuplicate,
				}"
				class="slider__slide"
				:class="sliderName && `${sliderName}__slide`"
				:zoom="useZoom"
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
		</Swiper>
	</div>
</template>

<script setup lang="ts">
	import {Swiper, SwiperSlide} from 'swiper/vue';
	import {EffectFade, Navigation,} from 'swiper/modules';

	import type {Swiper as SwiperType, SwiperOptions} from 'swiper/types';

	import 'swiper/css';
	import 'swiper/css/effect-fade';
	import 'swiper/css/navigation';
	import 'swiper/css/pagination';
	import 'swiper/css/thumbs';
	import 'swiper/css/zoom';

	import type SliderArrows from '~/components/slider/SliderArrows.vue';
	import SectionHeader from '~/components/ui/SectionHeader.vue';

	type SliderItem = {
		id: string | number;
		[key: string]: unknown;
	};

	type SliderWrapperProps = {
		items: SliderItem[];
		additionalSettings?: SwiperOptions;
		sliderName?: string;
		title?: string;
		blockName?: string;
		useZoom?: boolean;
		useClickNavigation?: boolean;
		themeBtn?: string;
	};

	const props = withDefaults(defineProps<SliderWrapperProps>(), {
		items: () => [],
		additionalSettings: () => ({}),
		themeBtn: 'light-blue',
	});

	const swiperRef = useTemplateRef<InstanceType<typeof Swiper>>('swiperRef');

	const sliderArrowsRef =
		useTemplateRef<InstanceType<typeof SliderArrows>>('sliderArrowsRef');

	const swiperInstance = ref<SwiperType | null>(null);

	const swiperSettings = computed<SwiperOptions>(() => ({
		modules: [
			EffectFade,
			Navigation,
		],

		slidesPerView: 'auto',
		spaceBetween: 0,
		grabCursor: props.items.length > 1,

		navigation: sliderArrowsRef.value
			? {
				enabled: true,
				prevEl: sliderArrowsRef.value.btnPrev,
				nextEl: sliderArrowsRef.value.btnNext,
			}
			: false,

		pagination: false,

		...props.additionalSettings,
	}));

	const hasNavigation = computed(
		() => props.items.length > 1
	);

	const activeIndex = ref(0);
	const realIndex = ref(0);

	const slidePrev = () => swiperInstance.value?.slidePrev();

	const slideNext = () => swiperInstance.value?.slideNext();

	const slideTo = (index: number) =>
		swiperInstance.value?.slideTo(index);

	const emit = defineEmits<{
		swiper: [swiper: SwiperType];
		slideChange: [swiper: SwiperType];
		zoomChange: [swiper: SwiperType];
	}>();

	function onSwiper(swiper: SwiperType) {
		swiperInstance.value = swiper;

		activeIndex.value = swiper.activeIndex;
		realIndex.value = swiper.realIndex;

		emit('swiper', swiper);
	}

	function onSlideChange(swiper: SwiperType) {
		activeIndex.value = swiper.activeIndex;
		realIndex.value = swiper.realIndex;

		emit('slideChange', swiper);
	}

	function onZoomChange(swiper: SwiperType) {
		emit('zoomChange', swiper);
	}

	defineSlots<{
		header?: () => unknown;

		slide?: (_props: {
			item: SliderItem;
			index: number;
			isActive: boolean;
			isPrev: boolean;
			isNext: boolean;
			isVisible: boolean;
			isDuplicate: boolean;
		}) => unknown;
	}>();

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
<style scoped lang="less">
:deep(.swiper) {
	overflow: var(--slider-overflow, hidden);
	border-radius: var(--swiper-border-radius, 0rem);
}

:deep(.swiper-slide) {
	width: ~'var(--slide-width, calc((100% - (var(--slides-count, 1) - 1) * var(--slider-gap, var(--grid-gap))) / var(--slides-count, 1)))';

	&:not(:last-child) {
		margin-right: var(--slider-gap, var(--grid-gap));
	}
}
</style>