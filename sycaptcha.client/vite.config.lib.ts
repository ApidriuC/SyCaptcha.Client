import react from '@vitejs/plugin-react';
import path, { resolve } from 'path';
import { fileURLToPath } from 'url';
import { defineConfig } from 'vite';
import { libInjectCss } from 'vite-plugin-lib-inject-css';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
    plugins: [
        react(),
        libInjectCss(),
        viteStaticCopy({
            targets: [
                { src: 'src/**/*.css', dest: 'styles' }
            ]
        })
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
            '@components': fileURLToPath(new URL('./src/sycaptcha/components', import.meta.url)),
            '@hooks': fileURLToPath(new URL('./src/sycaptcha/hooks', import.meta.url)),
            '@helpers': fileURLToPath(new URL('./src/sycaptcha/helpers', import.meta.url)),
            '@contexts': fileURLToPath(new URL('./src/sycaptcha/contexts', import.meta.url)),
            '@constants': fileURLToPath(new URL('./src/sycaptcha/constants', import.meta.url)),
            '@types': fileURLToPath(new URL('./src/sycaptcha/types', import.meta.url)),
            '@assets': fileURLToPath(new URL('./src/sycaptcha/assets', import.meta.url))
        }
    },
    build: {
        lib: {
            entry: {
                index: resolve(__dirname, 'src/sycaptcha/index.ts'),
                'assets/index': resolve(__dirname, 'src/sycaptcha/assets/index.ts'),
                'constants/index': resolve(__dirname, 'src/sycaptcha/constants/index.ts'),
                'components/index': resolve(__dirname, 'src/sycaptcha/components/index.ts'),
                'contexts/index': resolve(__dirname, 'src/sycaptcha/contexts/index.ts'),
                'helpers/index': resolve(__dirname, 'src/sycaptcha/helpers/index.ts'),
                'hooks/index': resolve(__dirname, 'src/sycaptcha/hooks/index.ts'),
                'types/index': resolve(__dirname, 'src/sycaptcha/types/index.ts')
            },
            name: 'SyCaptcha',
            formats: ['es', 'cjs']
        },
        rollupOptions: {
            external: ['react', 'react-dom', 'react/jsx-runtime'],
            output: {
                exports: 'named',
                preserveModules: true,
                preserveModulesRoot: path.resolve(__dirname, 'src/sycaptcha'),
                entryFileNames: '[name].[format].js',
                globals: {
                    'react-dom': 'ReactDom',
                    react: 'React',
                    'react/jsx-runtime': 'ReactJsxRuntime'
                }
            }
        }
    }
})
