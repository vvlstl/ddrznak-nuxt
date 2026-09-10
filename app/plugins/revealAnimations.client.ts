export default defineNuxtPlugin({
    name: 'reveal-animations',
    enforce: 'post',
    setup() {
        onNuxtReady(() => {
            const els = Array.from(document.querySelectorAll('.reveal'));
            const reveal = (el: Element) => el.classList.add('is-visible');

            // Старые вебвью без IntersectionObserver — показываем всё сразу
            if (!('IntersectionObserver' in window)) {
                els.forEach(reveal);
                return;
            }

            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            reveal(entry.target);
                            observer.unobserve(entry.target);
                        }
                    });
                },
                {
                    rootMargin: '-60px 0px 0px 0px',
                    threshold: 0.12,
                }
            );

            els.forEach((el) => observer.observe(el));

            /** Встроенные браузеры могут грузить страницу в фоне —
             *IntersectionObserver не срабатывает при показе. Ручная проверка.
             */
            const manualCheck = () => {
                els.forEach((el) => {
                    if (el.classList.contains('is-visible')) return;
                    const rect = el.getBoundingClientRect();
                    if (rect.top < window.innerHeight - 60 && rect.bottom > 0) {
                        reveal(el);
                    }
                });
            };

            document.addEventListener('visibilitychange', () => {
                if (!document.hidden) manualCheck();
            });
            window.addEventListener('pageshow', manualCheck);
            window.addEventListener('scroll', manualCheck, {passive: true});
        });
    },
});
