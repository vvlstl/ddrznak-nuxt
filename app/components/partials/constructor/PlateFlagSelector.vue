<template>
	<div class="constructor-field">
		<div class="constructor-field__label-row">
			<label class="constructor-field__label">Флаг RUS</label>
		</div>
		<div class="plate-flag-selector">
			<button
				type="button"
				class="plate-flag-selector__row"
				:disabled="!enabled"
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
				:disabled="!flag || !enabled"
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

			<button
				type="button"
				class="plate-flag-selector__row"
				:disabled="!enabled || !holesAllowed"
				:aria-pressed="holesEnabled"
				@click="onToggleHoles"
			>
				<span
					class="plate-flag-selector__toggle"
					:class="{ 'plate-flag-selector__toggle--on': holesEnabled }"
					aria-hidden="true"
				>
					<span class="plate-flag-selector__knob"/>
				</span>
				<span class="plate-flag-selector__text">{{ holesEnabled ? 'С отверстиями' : 'Без отверстий' }}</span>
			</button>
		</div>
	</div>
</template>

<script setup lang="ts">
	import type {TPlateType} from '~/types/plate/TPlateColor.ts';

	type TComponentProps = {
		flag: boolean;
		raised: boolean;
		holesEnabled: boolean;
		type?: TPlateType;
		enabled?: boolean;
	};

	const props = withDefaults(defineProps<TComponentProps>(), {
		enabled: true,
		type: undefined,
	});

	const HOLE_ALLOWED_TYPES: TPlateType[] = ['auto', 'trailer'];

	const holesAllowed = computed(() =>
		HOLE_ALLOWED_TYPES.includes(props.type!),
	);

	const emit = defineEmits<{
		'update:flag': [boolean];
		'update:raised': [boolean];
		'update:holesEnabled': [boolean];
	}>();

	function onToggleFlag() {
		if (!props.enabled) return;
		const next = !props.flag;
		emit('update:flag', next);
		if (!next && props.raised) {
			emit('update:raised', false);
		}
	}

	function onToggleHoles() {
		if (!props.enabled) return;
		if (!holesAllowed.value) return;
		emit('update:holesEnabled', !props.holesEnabled);
	}

	function onToggleRaised() {
		if (!props.enabled) return;
		if (!props.flag) return;
		emit('update:raised', !props.raised);
	}
</script>
