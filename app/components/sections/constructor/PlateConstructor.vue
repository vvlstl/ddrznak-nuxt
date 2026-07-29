<template>
	<section id="constructor" class="constructor">
		<div class="constructor__container">
			<header class="constructor__header">
				<span class="constructor__eyebrow">Конструктор номера</span>
				<h2 class="constructor__title">
					Соберите свой номер<br>
					<span class="constructor__title-accent">за 60 секунд</span>
				</h2>
				<p class="constructor__lead">
					Введите желаемую комбинацию, выберите тип и&nbsp;рамку. Цена рассчитывается мгновенно. Готовый проект можно сразу отправить в&nbsp;производство.
				</p>
			</header>

			<div class="constructor__grid">
				<!-- Контролы -->
				<div class="constructor__controls">
					<PlateTypeSelector
						v-model="state.type"
						@update:price="onTypePrice"
					/>
					<PlateColorSelector v-model="state.color"/>
					<PlateInputGroup v-model="state.combination"/>
					<RegionChips v-model="state.combination.region"/>
					<FrameSelector
						v-model="state.frame"
						@update:priceAdd="onFramePriceAdd"
					/>
				</div>

				<!-- Превью -->
				<aside class="constructor__preview">
					<div class="constructor__preview-header">
						<span class="constructor__preview-label">Предпросмотр</span>
						<span class="constructor__preview-live">
							<span class="constructor__preview-dot"/>
							Обновляется в&nbsp;реальном времени
						</span>
					</div>

					<div class="constructor__preview-plate">
						<PlateFrame :frame="state.frame">
							<PlatePreview
								:combination="state.combination"
								:color="state.color"
								:font-size="44"
								:flag-height="11"
							/>
						</PlateFrame>
					</div>

					<div class="constructor__specs">
						<div class="constructor__spec">
							<div class="constructor__spec-label">Размер</div>
							<div class="constructor__spec-value">{{ sizeByType }}</div>
						</div>
						<div class="constructor__spec">
							<div class="constructor__spec-label">Материал</div>
							<div class="constructor__spec-value">Al 1.0 + 3M™</div>
						</div>
						<div class="constructor__spec">
							<div class="constructor__spec-label">Срок</div>
							<div class="constructor__spec-value">24 часа</div>
						</div>
						<div class="constructor__spec">
							<div class="constructor__spec-label">Гарантия</div>
							<div class="constructor__spec-value">2 года</div>
						</div>
					</div>

					<div class="constructor__price">
						<div class="constructor__price-row">
							<div>
								<div class="constructor__price-label">Итого</div>
								<div class="constructor__price-value">
									{{ formattedTotal }} <span class="constructor__price-currency">₽</span>
								</div>
							</div>
							<div class="constructor__price-meta">
								<div>Производство 24ч</div>
								<div>Доставка бесплатно</div>
							</div>
						</div>
						<button
							type="button"
							class="btn btn--primary constructor__order-btn"
							@click="onOrder"
						>
							<Icon name="tabler:check"/>
							Отправить в&nbsp;производство
						</button>
						<p class="constructor__disclaimer">
							Нажимая кнопку, вы&nbsp;подтверждаете наличие оригинала номера или СТС. Производство осуществляется в&nbsp;соответствии с&nbsp;Постановлением №&nbsp;1416.
						</p>
					</div>
				</aside>
			</div>
		</div>

		<ToastNotification
			:visible="toast.visible"
			:title="toast.title"
			:text="toast.text"
		/>
	</section>
</template>

<script setup lang="ts">
	import PlateTypeSelector from '~/components/partials/constructor/PlateTypeSelector.vue';
	import PlateColorSelector from '~/components/partials/constructor/PlateColorSelector.vue';
	import PlateInputGroup from '~/components/partials/constructor/PlateInputGroup.vue';
	import RegionChips from '~/components/partials/constructor/RegionChips.vue';
	import FrameSelector from '~/components/partials/constructor/FrameSelector.vue';
	import PlateFrame from '~/components/ui/plate/PlateFrame.vue';
	import PlatePreview from '~/components/ui/plate/PlatePreview.vue';
	import ToastNotification from '~/components/ui/toast/ToastNotification.vue';
	import type { TPlateType } from '~/types/plate/TPlateColor.ts';

	const state = reactive({
		type: 'auto' as TPlateType,
		color: 'white' as 'white' | 'yellow' | 'black',
		frame: 'none' as 'none' | 'black' | 'chrome' | 'carbon' | 'gold',
		combination: {
			letterFirst: 'А',
			digits: '777',
			lettersLast: 'АА',
			region: '77',
		},
		basePrice: 4900,
		framePriceAdd: 0,
	});

	const SIZE_BY_TYPE: Record<TPlateType, string> = {
		auto: '520 × 112 мм',
		moto: '285 × 184 мм',
		trailer: '285 × 184 мм',
		tractor: '285 × 205 мм',
	};

	const sizeByType = computed(() => SIZE_BY_TYPE[state.type]);

	const total = computed(() => state.basePrice + state.framePriceAdd);

	const formattedTotal = computed(() =>
		total.value.toLocaleString('ru-RU').replace(/,/g, ' '),
	);

	function onTypePrice(price: number) {
		state.basePrice = price;
	}

	function onFramePriceAdd(priceAdd: number) {
		state.framePriceAdd = priceAdd;
	}

	const toast = reactive({
		visible: false,
		title: '',
		text: '',
	});

	let toastTimer: ReturnType<typeof setTimeout> | null = null;

	function onOrder() {
		const c = state.combination;
		const plate = `${c.letterFirst || '·'} ${c.digits || '···'} ${c.lettersLast || '··'} | ${c.region || '···'}`;
		toast.title = 'Заявка принята';
		toast.text = `Номер ${plate} отправлен в производство. Менеджер свяжется в течение 15 минут.`;
		toast.visible = true;
		console.debug('PlateConstructor:order', plate);

		if (toastTimer) clearTimeout(toastTimer);
		toastTimer = setTimeout(() => {
			toast.visible = false;
		}, 4500);
	}

	onMounted(() => {
		console.debug('PlateConstructor:mount', state);
	});

	onUnmounted(() => {
		if (toastTimer) clearTimeout(toastTimer);
	});
</script>
