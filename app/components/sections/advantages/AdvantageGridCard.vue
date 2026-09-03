<template>
  <div class="advantage-grid-card">
    <div class="advantage-grid-card__header">
      <div class="advantage-grid-card__icon">
        <Icon :name="item.icon"/>
      </div>
      <span v-if="item.index" class="advantage-grid-card__index">{{ item.index }}</span>
    </div>
    <h3 class="advantage-grid-card__title">{{ item.title }}</h3>
    <p class="advantage-grid-card__description">{{ item.description }}</p>
  </div>
</template>

<script setup lang="ts">
import type {TAdvantageCard} from "~/types/advantages/TAdvantageCard.ts";

defineProps<{
  item: TAdvantageCard;
}>();
</script>