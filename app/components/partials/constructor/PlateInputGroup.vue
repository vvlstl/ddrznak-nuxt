<template>
	<div class="constructor-field">
		<div class="constructor-field__label-row">
			<label class="constructor-field__label">Комбинация</label>
		</div>
		<div class="plate-input-group">
			<input
				ref="l1Ref"
				v-model="letterFirst"
				type="text"
				class="plate-input"
				maxlength="1"
				placeholder="А"
				@input="onInput('letterFirst', $event, 'letter', 1)"
			>
			<input
				ref="n1Ref"
				v-model="digits"
				type="text"
				class="plate-input"
				maxlength="3"
				placeholder="777"
				@input="onInput('digits', $event, 'digit', 3)"
			>
			<input
				ref="l2Ref"
				v-model="lettersLast"
				type="text"
				class="plate-input"
				maxlength="2"
				placeholder="АА"
				@input="onInput('lettersLast', $event, 'letter', 2)"
			>
			<input
				ref="regionRef"
				v-model="region"
				type="text"
				class="plate-input"
				maxlength="3"
				placeholder="77"
				@input="onInput('region', $event, 'digit', 3)"
			>
		</div>
		<p class="constructor-field__hint">
			Доступные буквы: А, В, Е, К, М, Н, О, Р, С, Т, У, Х. Только кириллица.
		</p>
	</div>
</template>

<script setup lang="ts">
	import type { TPlateCombination } from '~/types/plate/TPlateColor.ts';

	type TComponentProps = {
		modelValue: TPlateCombination;
	}

	const emit = defineEmits<{
		'update:modelValue': [TPlateCombination];
	}>();

	const props = defineProps<TComponentProps>();

	const LATIN_TO_CYR: Record<string, string> = {
		'A': 'А', 'B': 'В', 'E': 'Е', 'K': 'К', 'M': 'М',
		'H': 'Н', 'O': 'О', 'P': 'Р', 'C': 'С', 'T': 'Т',
		'Y': 'У', 'X': 'Х',
	};

	const CYR_VALUES = new Set(Object.values(LATIN_TO_CYR));

	const letterFirst = ref(props.modelValue.letterFirst);
	const digits = ref(props.modelValue.digits);
	const lettersLast = ref(props.modelValue.lettersLast);
	const region = ref(props.modelValue.region);

	const l1Ref = useTemplateRef<HTMLInputElement>('l1Ref');
	const n1Ref = useTemplateRef<HTMLInputElement>('n1Ref');
	const l2Ref = useTemplateRef<HTMLInputElement>('l2Ref');
	const regionRef = useTemplateRef<HTMLInputElement>('regionRef');

	watch(() => props.modelValue, (val) => {
		letterFirst.value = val.letterFirst;
		digits.value = val.digits;
		lettersLast.value = val.lettersLast;
		region.value = val.region;
	});

	function sanitizeLetter(v: string, maxLen: number) {
		return v.toUpperCase()
			.split('')
			.map(c => LATIN_TO_CYR[c] ?? c)
			.filter(c => CYR_VALUES.has(c))
			.join('')
			.slice(0, maxLen);
	}

	function sanitizeDigit(v: string, maxLen: number) {
		return v.replace(/[^0-9]/g, '').slice(0, maxLen);
	}

	type TFieldType = 'letterFirst' | 'digits' | 'lettersLast' | 'region';

	function onInput(
		field: TFieldType,
		e: Event,
		kind: 'letter' | 'digit',
		maxLen: number,
	) {
		const target = e.target as HTMLInputElement;
		const sanitized = kind === 'letter'
			? sanitizeLetter(target.value, maxLen)
			: sanitizeDigit(target.value, maxLen);
		target.value = sanitized;

		if (field === 'letterFirst') letterFirst.value = sanitized;
		else if (field === 'digits') digits.value = sanitized;
		else if (field === 'lettersLast') lettersLast.value = sanitized;
		else region.value = sanitized;

		emit('update:modelValue', {
			letterFirst: letterFirst.value,
			digits: digits.value,
			lettersLast: lettersLast.value,
			region: region.value,
		});
	}

	defineExpose({ l1Ref, n1Ref, l2Ref, regionRef });
</script>