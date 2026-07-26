<template>
	<PromoBlock class="page__section"/>
</template>

<script setup lang="ts">
	import PromoBlock from "~/components/sections/promo-block/PromoBlock.vue";

	/** LCP-критичная секция (PromoBlock) импортируется статически.
	 * Остальные секции оборачиваются в defineAsyncComponent —
	 * они уходят в отдельные чанки и не блокируют initial render.
	 */
</script>