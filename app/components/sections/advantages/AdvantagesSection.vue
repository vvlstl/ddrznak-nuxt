<template>
  <section class="advantages-section">
    <div class="advantages-section__container">
      <div class="advantages-section__header">
        <div class="advantages-section__intro">
          <span class="advantages-section__eyebrow">Преимущества</span>
          <h2 class="advantages-section__title">
            Почему профессионалы<br>выбирают нас
          </h2>
        </div>
        <div class="advantages-section__desc">
          <p>Мы&nbsp;— крупнейший официальный производитель дубликатов государственных регистрационных знаков в&nbsp;России. Сочетаем банковскую точность процессов с&nbsp;премиальным подходом к&nbsp;каждому клиенту.</p>
        </div>
      </div>
      <div class="advantages-section__grid">
        <AdvantageGridCard
          v-for="item in items"
          :key="item.id"
          :item="item"
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type {TAdvantageCard} from "~/types/advantages/TAdvantageCard.ts";
import AdvantageGridCard from "~/components/sections/advantages/AdvantageGridCard.vue";

const props = defineProps<{
  items: TAdvantageCard[];
}>();

console.debug('AdvantagesSection:mount', props);
</script>