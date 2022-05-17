import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
    plugins: [solidPlugin(), tsconfigPaths()],
    server: {
        port: 4000,
        proxy: {
            '/api': {
                target: 'http://localhost:5000/',
                autoRewrite: true,
            },
        },
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
            'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization'
        }
    },
    build: {
        target: 'esnext',
        polyfillDynamicImport: false,
    },
    resolve: {
        alias: {
            '@/*': './src/*',
            '@components/*': './src/components/*',
            '@pages/*': './src/pages/*',
            '@utils/*': './src/utils/*',
        },
    },
});
