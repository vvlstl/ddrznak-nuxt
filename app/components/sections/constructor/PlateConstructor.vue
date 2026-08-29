<template>
	<section class="constructor">
		<div class="container">
			<div class="constructor__container">
				<SectionHeader
					eyebrow="Конструктор номера"
					title="Соберите свой номер <strong>за 60 секунд</strong>"
					lead="Введите желаемую комбинацию, выберите тип и рамку. Цена рассчитывается мгновенно. Готовый проект можно сразу отправить в производство."
				/>

				<div class="constructor__grid">
					<!-- Контролы -->
					<div class="constructor__controls">
						<PlateTypeSelector
							v-model="state.type"
							@update:price="onTypePrice"
						/>
						<PlateColorSelector v-model="state.color"/>
						<PlateFontSelector v-model="state.font"/>
						<PlateInputGroup v-model="state.combination"/>
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
							<PlatePreview
								:combination="state.combination"
								:color="state.color"
								:font="state.font"
							/>
						</div>

						<div class="constructor__price">
							<div class="constructor__price-row">
								<div>
									<div class="constructor__price-label">Итого</div>
									<div class="constructor__price-value">
										{{ formattedTotal }} <span class="constructor__price-currency">₽</span>
									</div>
								</div>


								<div class="constructor__spec">
									<div class="constructor__spec-label">Размер</div>
									<div class="constructor__spec-value">{{ sizeByType }}</div>
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
								Нажимая кнопку, вы&nbsp;подтверждаете наличие оригинала номера или СТС. Производство
								осуществляется в&nbsp;соответствии с&nbsp;Постановлением №&nbsp;1416.
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
		</div>
	</section>
</template>

<script setup lang="ts">
	import PlateTypeSelector from '~/components/partials/constructor/PlateTypeSelector.vue';
	import PlateColorSelector from '~/components/partials/constructor/PlateColorSelector.vue';
	import PlateFontSelector from '~/components/partials/constructor/PlateFontSelector.vue';
	import PlateInputGroup from '~/components/partials/constructor/PlateInputGroup.vue';
	import PlatePreview from '~/components/partials/plate/PlatePreview.vue';
	import ToastNotification from '~/components/ui/toast/ToastNotification.vue';
	import type {TPlateType} from '~/types/plate/TPlateColor.ts';
	import type {TPlateFont} from '~/types/plate/TPlateColor.ts';
	import SectionHeader from "~/components/ui/SectionHeader.vue";

	const state = reactive({
		type: 'auto' as TPlateType,
		color: 'white' as 'white' | 'yellow' | 'black',
		combination: {
			letterFirst: 'А',
			digits: '777',
			lettersLast: 'АА',
			region: '77',
		},
		font: 'standard' as TPlateFont,
		basePrice: 4900,
		framePriceAdd: 0,
	});

	const SIZE_BY_TYPE: Record<TPlateType, string> = {
		auto: '520 × 112 мм',
		moto: '245 × 160 мм',
		trailer: '520 × 112 мм',
		tractor: '288 × 206 мм',
		moped: '190 × 145 мм',
		bicycle: '150 × 100 мм',
	};

	const FONT_PRICE_WITH_FLAG: Record<TPlateFont, number> = {
		standard: 700,
		strict: 1250,
		maximum: 1500,
		vip: 1500,
	};

	const FONT_PRICE_WITHOUT_FLAG: Record<TPlateFont, number> = {
		standard: 799,
		strict: 1250,
		maximum: 1500,
		vip: 1500,
	};

	const RAISED_FLAG_PRICE = 250;

	const sizeByType = computed(() => SIZE_BY_TYPE[state.type]);

	const total = computed(() => FONT_PRICE_WITH_FLAG[state.font]);

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

		if (toastTimer) clearTimeout(toastTimer);
		toastTimer = setTimeout(() => {
			toast.visible = false;
		}, 4500);
	}

	onUnmounted(() => {
		if (toastTimer) clearTimeout(toastTimer);
	});
</script>
