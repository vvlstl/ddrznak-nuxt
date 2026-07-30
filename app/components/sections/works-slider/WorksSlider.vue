<template>
	<section id="works" class="works-slider reveal">
		<div class="works-slider__container">
			<div class="works-slider__header">
				<div class="works-slider__intro">
					<span class="works-slider__eyebrow">Выполненные работы</span>
					<h2 class="works-slider__title">
						Номера, которые мы<br>произвели за последний месяц
					</h2>
				</div>
				<div class="works-slider__nav">
					<button
						type="button"
						class="works-slider__nav-btn"
						aria-label="Предыдущие работы"
						@click="scrollBy(-1)"
					>
						<Icon name="tabler:arrow-left"/>
					</button>
					<button
						type="button"
						class="works-slider__nav-btn"
						aria-label="Следующие работы"
						@click="scrollBy(1)"
					>
						<Icon name="tabler:arrow-right"/>
					</button>
				</div>
			</div>

			<div
				ref="trackRef"
				class="works-slider__track custom-scrollbar--hidden"
				@mousedown="onDragStart"
				@touchstart.passive="onDragStart"
			>
				<WorkCard
					v-for="item in items"
					:key="item.id"
					:item="item"
					class="works-slider__card"
				/>
			</div>

			<div class="works-slider__footer">
				<p class="works-slider__stat">
					<span class="works-slider__stat-value" data-counter="12486">12 486</span> номеров произведено за последние 30 дней
				</p>
				<a href="#" class="works-slider__catalog">
					Смотреть весь каталог
					<Icon name="tabler:arrow-right"/>
				</a>
			</div>
		</div>
	</section>
</template>

<script setup lang="ts">
	import WorkCard from '~/components/partials/works-slider/WorkCard.vue';
	import type { TWorkCard } from '~/types/works/TWorkCard.ts';

	const items: TWorkCard[] = [
		{ id: 1, num: 'А 777 АА', region: '77', type: 'white', frame: 'black', client: 'Частный клиент', car: 'Mercedes S-Class', date: '14.11.2024', n: '12 486' },
		{ id: 2, num: 'В 001 ВВ', region: '777', type: 'white', frame: 'chrome', client: 'Корпоративный парк', car: 'BMW 7 Series', date: '13.11.2024', n: '12 485' },
		{ id: 3, num: 'Е 925 ЕЕ', region: '199', type: 'white', frame: 'carbon', client: 'Частный клиент', car: 'Audi A8', date: '13.11.2024', n: '12 484' },
		{ id: 4, num: 'К 100 КК', region: '750', type: 'white', frame: 'gold', client: 'VIP-клиент клуба', car: 'Rolls-Royce Phantom', date: '12.11.2024', n: '12 483' },
		{ id: 5, num: 'Т 050 ТТ', region: '197', type: 'yellow', frame: 'none', client: 'Таксопарк «Жёлтое»', car: 'Toyota Camry', date: '12.11.2024', n: '12 482' },
		{ id: 6, num: 'О 888 ОО', region: '99', type: 'white', frame: 'black', client: 'Частный клиент', car: 'Porsche Cayenne', date: '11.11.2024', n: '12 481' },
		{ id: 7, num: 'Р 333 РР', region: '78', type: 'white', frame: 'chrome', client: 'Бизнес-парк', car: 'Range Rover Autobiography', date: '11.11.2024', n: '12 480' },
		{ id: 8, num: 'С 001 СС', region: '147', type: 'black', frame: 'none', client: 'Военная часть', car: 'Урал-4320', date: '10.11.2024', n: '12 479' },
		{ id: 9, num: 'М 050 ММ', region: '777', type: 'white', frame: 'carbon', client: 'Член клуба Premium-Park', car: 'Lexus LX 600', date: '10.11.2024', n: '12 478' },
		{ id: 10, num: 'Н 700 НН', region: '198', type: 'white', frame: 'black', client: 'Частный клиент', car: 'Bentley Bentayga', date: '09.11.2024', n: '12 477' },
	];

	const trackRef = ref<HTMLElement | null>(null);
	const CARD_WIDTH = 400;

	function scrollBy(direction: 1 | -1) {
		const el = trackRef.value;
		if (!el) return;
		el.scrollBy({ left: direction * CARD_WIDTH, behavior: 'smooth' });
		console.debug('WorksSlider:scrollBy', direction);
	}

	// Drag-прокрутка
	const dragState = reactive({
		active: false,
		startX: 0,
		scrollLeft: 0,
	});

	function getPageX(e: MouseEvent | TouchEvent): number {
		if (window.TouchEvent && e instanceof TouchEvent) {
			return e.touches[0]?.pageX ?? 0;
		}
		return (e as MouseEvent).pageX;
	}

	function onDragStart(e: MouseEvent | TouchEvent) {
		const el = trackRef.value;
		if (!el) return;
		dragState.active = true;
		dragState.startX = getPageX(e) - el.offsetLeft;
		dragState.scrollLeft = el.scrollLeft;
		console.debug('WorksSlider:dragStart');
	}

	function onDragMove(e: MouseEvent | TouchEvent) {
		const el = trackRef.value;
		if (!el || !dragState.active) return;
		e.preventDefault?.();
		const x = getPageX(e) - el.offsetLeft;
		el.scrollLeft = dragState.scrollLeft - (x - dragState.startX) * 1.5;
	}

	function onDragEnd() {
		if (dragState.active) {
			dragState.active = false;
			console.debug('WorksSlider:dragEnd');
		}
	}

	onMounted(() => {
		window.addEventListener('mousemove', onDragMove);
		window.addEventListener('mouseup', onDragEnd);
		window.addEventListener('touchmove', onDragMove, { passive: false });
		window.addEventListener('touchend', onDragEnd);
		console.debug('WorksSlider:mount');
	});

	onUnmounted(() => {
		window.removeEventListener('mousemove', onDragMove);
		window.removeEventListener('mouseup', onDragEnd);
		window.removeEventListener('touchmove', onDragMove);
		window.removeEventListener('touchend', onDragEnd);
	});
</script>
