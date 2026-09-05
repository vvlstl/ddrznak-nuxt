<template>
	<div class="constructor-field">
		<div class="constructor-field__label-row">
			<label class="constructor-field__label">Комбинация</label>
		</div>

		<div
			class="plate-input-group"
			:class="{ 'plate-input-group--vertical': isVertical }"
		>
			<template v-for="item in schema" :key="item.field">
				<div v-if="item.row" class="plate-input-group__row">
					<input
						v-for="rowItem in item.row"
						:key="rowItem.field"
						:ref="refMap[rowItem.field]"
						v-model="state[rowItem.field]"
						type="text"
						class="plate-input"
						:maxlength="rowItem.maxLen"
						:placeholder="rowItem.placeholder"
						@input="onInput(rowItem.field, $event, rowItem.kind, rowItem.maxLen)"
					>
				</div>
				<input
					v-else
					:ref="refMap[item.field]"
					v-model="state[item.field]"
					type="text"
					class="plate-input"
					:maxlength="item.maxLen"
					:placeholder="item.placeholder"
					@input="onInput(item.field, $event, item.kind, item.maxLen)"
				>
			</template>
		</div>

		<p class="constructor-field__hint">
			Доступные буквы: А, В, Е, К, М, Н, О, Р, С, Т, У, Х. Только кириллица.
		</p>
	</div>
</template>

<script setup lang="ts">
	import type {TInputSchema, TPlateCombination} from '~/types/plate/TPlateColor.ts';

	type TFieldType = 'letterFirst' | 'digits' | 'letters' | 'lettersLast' | 'region';
	type TKind = 'letter' | 'digit';

	type TFieldDef = {
		field: TFieldType;
		kind: TKind;
		maxLen: number;
		placeholder: string;
		row?: never;
	};

	type TRowDef = {
		row: TFieldDef[];
		field?: never;
		kind?: never;
		maxLen?: never;
		placeholder?: never;
	};

	type TSchemaItem = TFieldDef | TRowDef;

	type TComponentProps = {
		modelValue: TPlateCombination;
		inputSchema: TInputSchema;
	};

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

	const state = reactive<TPlateCombination>({ ...props.modelValue });

	watch(() => props.modelValue, (val) => Object.assign(state, val));

	// refs
	const l1Ref = useTemplateRef<HTMLInputElement>('l1Ref');
	const n1Ref = useTemplateRef<HTMLInputElement>('n1Ref');
	const l2Ref = useTemplateRef<HTMLInputElement>('l2Ref');
	const regionRef = useTemplateRef<HTMLInputElement>('regionRef');

	const refMap: Record<TFieldType, string> = {
		letterFirst: 'l1Ref',
		letters:     'l1Ref',
		digits:      'n1Ref',
		lettersLast: 'l2Ref',
		region:      'regionRef',
	};

	// схемы
	const FIELD_DEFS = {
		letterFirst: { field: 'letterFirst', kind: 'letter', maxLen: 1, placeholder: 'А'    } as TFieldDef,
		letters2:    { field: 'letters',     kind: 'letter', maxLen: 2, placeholder: 'АА'   } as TFieldDef,
		digits2:     { field: 'digits',      kind: 'digit',  maxLen: 2, placeholder: '55'   } as TFieldDef,
		digits3:     { field: 'digits',      kind: 'digit',  maxLen: 3, placeholder: '777'  } as TFieldDef,
		digits4:     { field: 'digits',      kind: 'digit',  maxLen: 4, placeholder: '7777' } as TFieldDef,
		lettersLast: { field: 'lettersLast', kind: 'letter', maxLen: 2, placeholder: 'АА'   } as TFieldDef,
		region:      { field: 'region',      kind: 'digit',  maxLen: 3, placeholder: '77'   } as TFieldDef,
	} as const;

	const SCHEMAS: Record<TInputSchema, TSchemaItem[]> = {
		auto: [
			FIELD_DEFS.letterFirst,
			FIELD_DEFS.digits3,
			FIELD_DEFS.lettersLast,
			FIELD_DEFS.region,
		],
		trailer: [
			FIELD_DEFS.letters2,
			FIELD_DEFS.digits4,
			FIELD_DEFS.region,
		],
		moto: [
			FIELD_DEFS.digits4,
			{ row: [FIELD_DEFS.letters2, FIELD_DEFS.region] },
		],
		tractor: [
			FIELD_DEFS.digits4,
			{ row: [FIELD_DEFS.letters2, FIELD_DEFS.region] },
		],
		moped: [
			{ row: [FIELD_DEFS.letters2, FIELD_DEFS.digits2] },
			{ row: [FIELD_DEFS.lettersLast, FIELD_DEFS.region] },
		],
		offroad: [
			{ row: [FIELD_DEFS.letters2, FIELD_DEFS.region] },
			FIELD_DEFS.digits4,
		],
	};

	const schema = computed(() => SCHEMAS[props.inputSchema]);
	const isVertical = computed(() => ['moto', 'tractor', 'moped', 'offroad'].includes(props.inputSchema));

	// sanitize
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

	function onInput(field: TFieldType, e: Event, kind: TKind, maxLen: number) {
		const target = e.target as HTMLInputElement;
		const sanitized = kind === 'letter'
			? sanitizeLetter(target.value, maxLen)
			: sanitizeDigit(target.value, maxLen);

		target.value = sanitized;
		state[field] = sanitized;

		emit('update:modelValue', { ...state });
	}

	defineExpose({ l1Ref, n1Ref, l2Ref, regionRef });
</script>