export default defineNuxtPlugin({
    name: 'reveal-animations',
    enforce: 'post',
    hooks: {
        'app:mounted'() {
            setTimeout(() => {
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
            }, 200);
        },
    },
});
