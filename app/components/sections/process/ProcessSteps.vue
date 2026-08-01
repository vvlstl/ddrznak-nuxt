<template>
	<section id="process" class="process-steps reveal">
		<div class="process-steps__container">
			<header class="process-steps__header">
				<div class="process-steps__intro">
					<SectionHeader
						eyebrow="Процесс"
						title="От заявки до номера<br>на вашем автомобиле"
						lead="Прозрачный и предсказуемый процесс. Каждый шаг подтверждается документально — от проверки данных до момента, когда номер устанавливается на ваш автомобиль."
					/>
				</div>
			</header>

			<div class="process-steps__grid">
				<ProcessStep
					v-for="item in steps"
					:key="item.id"
					:item="item"
				/>
			</div>
		</div>
	</section>
</template>

<script setup lang="ts">
	import ProcessStep from '~/components/partials/process/ProcessStep.vue';
	import type { TProcessStep } from '~/types/process/TProcessStep.ts';
	import SectionHeader from "~/components/ui/SectionHeader.vue";

	const steps: TProcessStep[] = [
		{
			id: 1,
			step: '01',
			tag: 'Заявка',
			title: 'Заполните форму',
			description: 'Укажите текущий номер, тип и удобный центр изготовления. Заявка принимается онлайн 24/7.',
		},
		{
			id: 2,
			step: '02',
			tag: 'Документы',
			title: 'Приложите СТС',
			description: 'Загрузите фото СТС и оригинала номера. Мы проверяем данные в течение 15 минут.',
		},
		{
			id: 3,
			step: '03',
			tag: 'Производство',
			title: 'Изготавливаем',
			description: 'Фотоэкспозиция, штамповка, нанесение плёнки 3M™, контроль качества по 14 параметрам.',
		},
		{
			id: 4,
			step: '04',
			tag: 'Получение',
			title: 'Забираете номер',
			description: 'Самовывоз, курьерская доставка по Москве или СДЭК по России. Готовность — 24 часа.',
		},
	];
</script>
