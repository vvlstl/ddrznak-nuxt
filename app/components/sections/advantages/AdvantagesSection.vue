<template>
	<section class="advantages-section">
		<div class="container">
			<div class="advantages-section__content">
				<SectionHeader
					eyebrow="Преимущества"
					title="Почему профессионалы выбирают нас"
					lead="Мы&nbsp;— крупнейший официальный производитель дубликатов государственных регистрационных знаков в&nbsp;России.
					Сочетаем банковскую точность процессов с&nbsp;премиальным подходом к&nbsp;каждому клиенту."
				/>
				<div class="advantages-section__grid custom-scrollbar custom-scrollbar--hidden">
					<AdvantageGridCard
						v-for="item in items"
						:key="item.id"
						class="advantages-section__item"
						:item="item"
					/>
				</div>
			</div>
		</div>
	</section>
</template>

<script setup lang="ts">
	import type {TAdvantageCard} from "~/types/advantages/TAdvantageCard.ts";
	import AdvantageGridCard from "~/components/sections/advantages/AdvantageGridCard.vue";
	import SectionHeader from "~/components/ui/SectionHeader.vue";

	defineProps<{
		items: TAdvantageCard[];
	}>();

</script>