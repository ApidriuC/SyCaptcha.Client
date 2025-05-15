import path from 'path'
import dts from 'rollup-plugin-dts'

export default {
    input: path.resolve(__dirname, 'src/sycaptcha/index.ts'),
    output: {
        file: 'dist/index.d.ts',
        format: 'es'
    },
    plugins: [dts()]
}