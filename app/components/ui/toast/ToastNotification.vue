<template>
	<Teleport to="body">
		<Transition name="toast">
			<div
				v-if="visible"
				class="toast"
				role="status"
				aria-live="polite"
			>
				<div class="toast__inner">
					<Icon name="tabler:circle-check" class="toast__icon"/>
					<div class="toast__content">
						<div class="toast__title">{{ title }}</div>
						<div class="toast__text">{{ text }}</div>
					</div>
				</div>
			</div>
		</Transition>
	</Teleport>
</template>

<script setup lang="ts">
	type TComponentProps = {
		visible: boolean;
		title: string;
		text: string;
	}

	const props = defineProps<TComponentProps>();

	watch(() => props.visible, (v) => {
		console.debug('ToastNotification:visible', v);
	});
</script>
