export default defineNuxtPlugin({
    name: 'reveal-animations',
    enforce: 'post',
    hooks: {
        'app:mounted'() {
            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            entry.target.classList.add('is-visible');
                        }
                    });
                },
                {
                    rootMargin: '-60px 0px 0px 0px',
                    threshold: 0.12,
                }
            );

            document.querySelectorAll('.reveal').forEach((el) => {
                observer.observe(el);
            });

            console.debug('RevealAnimations:observer', { elements: document.querySelectorAll('.reveal').length });
        },
    },
});
