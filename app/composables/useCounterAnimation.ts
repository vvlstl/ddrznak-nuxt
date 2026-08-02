export function useCounterAnimation(el: Ref<HTMLElement | null>) {
    onMounted(() => {
        if (!el.value) return;

        const raw = el.value.dataset.counter;
        if (!raw) return;

        const match = raw.match(/^([+\-]?)(\d+(?:\.\d+)?)(.*)$/);
        if (!match) return;

        const [, rawPrefix = '', rawNumber = '0', rawSuffix = ''] = match;

        const target = parseFloat(rawNumber);
        const isFloat = rawNumber.includes('.');
        const decimals = isFloat ? rawNumber.split('.')[1]?.length ?? 0 : 0;

        const STEPS = 30;
        const stepValue = target / STEPS;
        const duration = 16;
        let current = 0;
        let count = 0;

        const format = (val: number) => {
            const num = isFloat ? val.toFixed(decimals) : Math.ceil(val).toString();
            return `${rawPrefix}${num}${rawSuffix}`;
        };

        const observer = new IntersectionObserver(
            (entries) => {
                const entry = entries[0];
                if (!entry?.isIntersecting) return; // ← ?. фиксит TS18048
                observer.disconnect();

                const timer = setInterval(() => {
                    count++;
                    current += stepValue;
                    if (count >= STEPS) {
                        if (el.value) el.value.textContent = format(target);
                        clearInterval(timer);
                    } else {
                        if (el.value) el.value.textContent = format(current);
                    }
                }, duration);
            },
            {threshold: 0}
        );

        observer.observe(el.value);
    });
}