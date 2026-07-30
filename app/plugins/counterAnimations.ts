export default defineNuxtPlugin({
    name: 'counter-animations',
    enforce: 'post',
    hooks: {
        'app:mounted'() {
            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            const el = entry.target as HTMLElement;
                            const target = parseInt(el.dataset.counter || '0', 10);
                            const duration = 28; // ms per step
                            const steps = Math.min(50, Math.ceil(target / 50));
                            const stepValue = Math.ceil(target / steps);
                            let current = 0;

                            const timer = setInterval(() => {
                                current += stepValue;
                                if (current >= target) {
                                    el.textContent = target.toLocaleString('ru-RU').replace(/,/g, ' ');
                                    clearInterval(timer);
                                } else {
                                    el.textContent = Math.min(current, target).toLocaleString('ru-RU').replace(/,/g, ' ');
                                }
                            }, duration);

                            observer.unobserve(el);
                        }
                    });
                },
                {
                    rootMargin: '-60px 0px 0px 0px',
                    threshold: 0.12,
                }
            );

            document.querySelectorAll('[data-counter]').forEach((el) => {
                observer.observe(el);
            });

            console.debug('CounterAnimations:observer', {elements: document.querySelectorAll('[data-counter]').length});
        },
    },
});
