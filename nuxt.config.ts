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
        baseURL: '/'
    },

    nitro: {
        minify: true,
        compressPublicAssets: {
            gzip: true,
            brotli: true,
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
        '~/assets/css/style.less'
    ],

    icon: {
        serverBundle: {
            collections: []
        }
    },

    vite: {
        sourcemap: false,
        css: {
            preprocessorOptions: {
                less: {
                    javascriptEnabled: true,
                    globalVars: {
                        imagePath: '~/assets/images/',
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