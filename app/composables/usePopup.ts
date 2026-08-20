import type {TPopupItem} from '~/types/popup/TPopupItem';

// Module-scope state: единый стек попапов на всё приложение
const popups = ref<TPopupItem[]>([]);
const resolvers = new Map<number, () => void>();

let nextId = 1;

export function usePopup() {
	function show(name: string, props: Record<string, unknown> = {}): Promise<void> {
		const id = nextId++;

		return new Promise<void>((resolve) => {
			resolvers.set(id, resolve);
			popups.value.push({id, name, props});
		});
	}

	function resolvePopup(id: number) {
		const resolve = resolvers.get(id);
		if (!resolve) return;

		resolvers.delete(id);
		resolve();
	}

	function hide(name: string) {
		const popup = popups.value.findLast((item: TPopupItem) => item.name === name);
		if (!popup) return;

		popups.value = popups.value.filter((item: TPopupItem) => item.id !== popup.id);
		resolvePopup(popup.id);
	}

	function hideTop() {
		const popup = popups.value.at(-1);
		if (!popup) return;

		popups.value = popups.value.slice(0, -1);
		resolvePopup(popup.id);
	}

	function hideAll() {
		const ids = popups.value.map((item: TPopupItem) => item.id);

		popups.value = [];
		ids.forEach(resolvePopup);
	}

	return {
		popups,
		show,
		hide,
		hideTop,
		hideAll,
	};
}
