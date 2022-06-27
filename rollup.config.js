import svelte from 'rollup-plugin-svelte';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import preprocess from 'svelte-preprocess';
import scss from 'rollup-plugin-scss';

import { mdsvex } from 'mdsvex';

const production = !process.env.ROLLUP_WATCH;

const plugins = [
    svelte({
        dev: !production,
        compilerOptions: {
            dev: !production,
        },
        extensions: ['.svelte', '.md'],
        preprocess: [
            mdsvex({
                extensions: ['.svelte', '.md'],
            }),
            preprocess(),
        ],
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

let configs = [];

if (process.env.NODE_ENV === 'thoughts') {
    configs.push({
        input: 'thoughts/src/thoughts.js',
        output: {
            interop: false,
            format: 'es',
            name: 'thoughts',
            dir: 'thoughts/dist/js',
            // chunkFileNames: (chunkInfo) => {
            //     console.log(chunkInfo.name);
            //     return `${chunkInfo.name}.js`;
            // },
            manualChunks: (moduleName) => {
                if (moduleName.includes('node_modules')) {
                    return 'vendor';
                }
                if (moduleName.includes('src/js') || moduleName.includes('src/markdown/common')) {
                    return 'common';
                }
            },
        },
        plugins: [
            ...plugins,
            scss({
                sass: require('node-sass'),
                output: 'thoughts/dist/css/thoughts.css',
                outputStyle: 'compressed',
            }),
        ],
        watch,
    });
} else {
    configs.push(
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
        }
    );
}

export default configs;
