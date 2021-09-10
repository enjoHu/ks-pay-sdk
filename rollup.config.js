// rollup.config.js
import { babel, getBabelOutputPlugin } from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'

export default {
    input: 'src/index.js',
    output: [{
        file: 'libs/index.esm.js',
        format: 'esm',
        plugins: [
            getBabelOutputPlugin({
                presets: ['@babel/preset-env']
            })
        ]
    }, {
        file: 'libs/index.js',
        format: 'umd',
        name: 'ks-pay-sdk'
    }],
    plugins: [
        commonjs(),
        babel({
            babelHelpers: 'bundled',
            presets: ['@babel/preset-env'],
            exclude: 'node_modules/**' // only transpile our source code
        })
    ]
}
