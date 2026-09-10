// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2025-07-15',
    sourcemap: {
        server: false,
        client: false
    },
    devtools: {
        enabled: true,
        timeline: {
            enabled: true
        }
    },

    app: {
        baseURL: '/ddrznak-nuxt/',
        head: {
            script: [
                {
                    // Прогрессивное улучшение: класс js ставится до первой отрисовки.
                    // Стили reveal-анимаций применяются только при наличии JS.
                    innerHTML: "document.documentElement.classList.add('js')",
                },
            ],
        },
    },

    nitro: {
        minify: true,
        compressPublicAssets: {
            gzip: true,
            brotli: true,
        },
        prerender: {
            crawlLinks: false,
            routes: [],
            continueOnError: true,
        },
        routeRules: {
            '/_nuxt/**': {
                headers: {
                    'Cache-Control': 'public, max-age=31536000, immutable',
                },
            },
            '/fonts/**': {
                headers: {
                    'Cache-Control': 'public, max-age=31536000, immutable',
                },
            },
        },
    },

    features: {
        inlineStyles: false,
    },

    modules: [
        '@nuxt/eslint',
        '@nuxt/image',
        '@nuxt/icon',
        '@nuxt/hints',
        '@nuxt/scripts',
    ],

    postcss: {
        plugins: {
            autoprefixer: {},
        },
    },

    css: [
        '~/assets/css/style.less',
        'swiper/css',
        'swiper/css/navigation',
    ],

    icon: {
        // Статический хостинг (GitHub Pages) — серверного /api/_nuxt_icon нет.
        // Все иконки бандлим в клиент, рантайм-фетч отключаем.
        provider: 'none',
        clientBundle: {
            scan: true,
            sizeLimitKb: 512,
        },
    },

    // Статический хостинг — IPX-оптимизация недоступна (провайдер ipxStatic
    // требует prerender для генерации _ipx/, который отключён из-за бага
    // сборки). Отдаём исходники как есть.
    image: {
        provider: 'none',
    },

    // @nuxt/hints: lazyLoad шлёт POST на /__nuxt_hints/lazy-load без учёта
    // app.baseURL → 404. Отключаем отправку (devtools), сам модуль остаётся.
    hints: {
        features: {
            lazyLoad: {
                devtools: false,
            },
        },
    },

    vite: {
        sourcemap: false,
        css: {
            preprocessorOptions: {
                less: {
                    javascriptEnabled: true,
                    globalVars: {
                        imagePath: '/images/',
                        fontPath: '/fonts/'
                    }
                }
            }
        },
        build: {
            rollupOptions: {
                output: {},
            },
        },
    }
})