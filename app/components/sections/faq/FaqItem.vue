<template>
	<div
		class="faq-item"
		:class="{ 'faq-item--open': isOpen }"
	>
		<button
			type="button"
			class="faq-item__toggle"
			:aria-expanded="isOpen"
			@click="toggle"
		>
			<span class="faq-item__question">{{ item.question }}</span>
			<span class="faq-item__icon" aria-hidden="true">
				<Icon name="tabler:chevron-down"/>
			</span>
		</button>
		<Spoiler :is-open="isOpen">
			<div class="faq-item__content-inner">
				{{ item.answer }}
			</div>
		</Spoiler>
	</div>
</template>

<script setup lang="ts">
	import type {TFaqItem} from '~/types/faq/TFaqItem.ts';
	import Spoiler from "~/components/common/Spoiler.vue";

	type TComponentProps = {
		item: TFaqItem;
		defaultOpen?: boolean;
	}

	const props = defineProps<TComponentProps>();

	const isOpen = ref<boolean>(props.defaultOpen ?? false);

	function toggle(state?: boolean) {
		if (typeof state !== 'boolean') state = !isOpen.value;

		isOpen.value = state;
	}

</script>
