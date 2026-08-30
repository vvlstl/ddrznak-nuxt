<template>
	<div class="constructor-field">
		<div class="constructor-field__label-row">
			<label class="constructor-field__label">Флаг RUS</label>
		</div>
		<div class="plate-flag-selector">
			<button
				type="button"
				class="plate-flag-selector__row"
				:aria-pressed="flag"
				@click="onToggleFlag"
			>
				<span
					class="plate-flag-selector__toggle"
					:class="{ 'plate-flag-selector__toggle--on': flag }"
					aria-hidden="true"
				>
					<span class="plate-flag-selector__knob"/>
				</span>
				<span class="plate-flag-selector__text">{{ flag ? 'С флагом' : 'Без флага' }}</span>
			</button>

			<button
				type="button"
				class="plate-flag-selector__row"
				:disabled="!flag"
				:aria-pressed="raised"
				@click="onToggleRaised"
			>
				<span
					class="plate-flag-selector__toggle"
					:class="{ 'plate-flag-selector__toggle--on': raised }"
					aria-hidden="true"
				>
					<span class="plate-flag-selector__knob"/>
				</span>
				<span class="plate-flag-selector__text">Рельефный флаг</span>
			</button>
		</div>
	</div>
</template>

<script setup lang="ts">
	type TComponentProps = {
		flag: boolean;
		raised: boolean;
	};

	const props = defineProps<TComponentProps>();

	const emit = defineEmits<{
		'update:flag': [boolean];
		'update:raised': [boolean];
	}>();

	function onToggleFlag() {
		const next = !props.flag;
		emit('update:flag', next);
		if (!next && props.raised) {
			emit('update:raised', false);
		}
	}

	function onToggleRaised() {
		if (!props.flag) return;
		emit('update:raised', !props.raised);
	}
</script>
