<template>
	<article class="work-card">
		<div class="work-card__visual">
			<div class="work-card__visual-glow"/>
			<PlateFrame :frame="item.frame">
				<PlatePreview
					class="work-card__plate"
					:combination="combination"
					:color="item.type"
					:font-size="30"
					:flag-height="9"
				/>
			</PlateFrame>
			<span class="work-card__num">№ {{ item.n }}</span>
			<span class="work-card__type">{{ typeName }}</span>
		</div>
		<div class="work-card__body">
			<div class="work-card__row">
				<div class="work-card__cell">
					<div class="work-card__label">Клиент</div>
					<div class="work-card__value">{{ item.client }}</div>
				</div>
				<div class="work-card__cell work-card__cell--right">
					<div class="work-card__label">Дата</div>
					<div class="work-card__value work-card__value--date">{{ item.date }}</div>
				</div>
			</div>
			<div class="work-card__car">
				<Icon name="tabler:car"/>
				{{ item.car }}
			</div>
		</div>
	</article>
</template>

<script setup lang="ts">
	import PlateFrame from '~/components/ui/plate/PlateFrame.vue';
	import PlatePreview from '~/components/ui/plate/PlatePreview.vue';
	import type { TWorkCard } from '~/types/works/TWorkCard.ts';
	import type { TPlateCombination } from '~/types/plate/TPlateColor.ts';

	type TComponentProps = {
		item: TWorkCard;
	}

	const props = defineProps<TComponentProps>();

	const combination = computed<TPlateCombination>(() => {
		const parts = props.item.num.split(' ').filter(Boolean);
		return {
			letterFirst: parts[0] ?? '',
			digits: parts[1] ?? '',
			lettersLast: parts[2] ?? '',
			region: props.item.region,
		};
	});

	const typeName = computed(() => ({
		white: 'Стандарт',
		yellow: 'Жёлтый',
		black: 'Чёрный',
	}[props.item.type] ?? 'Стандарт'));

	console.debug('WorkCard:mount', props.item.id);
</script>
