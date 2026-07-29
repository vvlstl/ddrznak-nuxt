<template>
	<div
		class="faq-item"
		:class="{ 'faq-item--open': isOpen }"
	>
		<button
			type="button"
			class="faq-item__toggle"
			:aria-expanded="isOpen"
			@click="onToggle"
		>
			<span class="faq-item__question">{{ item.question }}</span>
			<span class="faq-item__icon" aria-hidden="true">
				<Icon name="tabler:plus"/>
			</span>
		</button>
		<div class="faq-item__content">
			<div class="faq-item__content-inner">
				{{ item.answer }}
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import type { TFaqItem } from '~/types/faq/TFaqItem.ts';

	type TComponentProps = {
		item: TFaqItem;
		isOpen?: boolean;
	}

	const emit = defineEmits<{
		toggle: [number];
	}>();

	const props = withDefaults(defineProps<TComponentProps>(), {
		isOpen: false,
	});

	function onToggle() {
		emit('toggle', props.item.id);
		console.debug('FaqItem:toggle', props.item.id, !props.isOpen);
	}
</script>
