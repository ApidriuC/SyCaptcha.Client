import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';

export default defineConfig({
    plugins: [react()],
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
    }
})