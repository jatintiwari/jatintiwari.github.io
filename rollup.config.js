import svelte from 'rollup-plugin-svelte';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import preprocess from 'svelte-preprocess';
import scss from 'rollup-plugin-scss';

const production = !process.env.ROLLUP_WATCH;

const plugins = [
    svelte({
        dev: !production,
        compilerOptions: {
            dev: !production,
        },
        extensions: ['.svelte', '.md'],
        preprocess: [preprocess()],
    }),
    resolve({
        browser: true,
        dedupe: ['svelte', 'md'],
    }),
    commonjs(),
    production && terser(),
];

const watch = {
    clearScreen: false,
};

let configs = [
    {
        input: 'src/main.js',
        output: {
            sourcemap: true,
            format: 'iife',
            name: 'app',
            file: 'dist/bundle.js',
        },
        plugins: [
            ...plugins,
            scss({
                sass: require('node-sass'),
                output: 'dist/bundle.css',
                outputStyle: 'compressed',
            }),
        ],
        watch,
    },
    {
        input: 'src/knowMore.js',
        output: {
            dir: 'dist',
        },
        plugins: [
            ...plugins,
            scss({
                sass: require('node-sass'),
                output: 'dist/knowMore.css',
                outputStyle: 'compressed',
            }),
        ],
        watch,
    },
];

export default configs;
