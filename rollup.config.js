import svelte from 'rollup-plugin-svelte';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
// import css from 'rollup-plugin-css-only';
import preprocess from 'svelte-preprocess';
import scss from 'rollup-plugin-scss';

import { mdsvex } from 'mdsvex';

const production = !process.env.ROLLUP_WATCH;

function serve() {
    let server;

    function toExit() {
        if (server) server.kill(0);
    }

    return {
        writeBundle() {
            if (server) return;
            server = require('child_process').spawn('npm', ['run', 'start', '--', '--dev'], {
                stdio: ['ignore', 'inherit', 'inherit'],
                shell: true,
            });

            process.on('SIGTERM', toExit);
            process.on('exit', toExit);
        },
    };
}

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
    // If you have external dependencies installed from
    // npm, you'll most likely need these plugins. In
    // some cases you'll need additional configuration -
    // consult the documentation for details:
    // https://github.com/rollup/plugins/tree/master/packages/commonjs
    resolve({
        browser: true,
        dedupe: ['svelte', 'md'],
    }),
    commonjs(),

    // In dev mode, call `npm run start` once
    // the bundle has been generated
    // !production && serve(),

    // If we're building for production (npm run build
    // instead of npm run dev), minify
    production && terser(),
];

const watch = {
    clearScreen: false,
};

let configs = [];

if (process.env.NODE_ENV === 'thoughts') {
    configs.push({
        input: 'thoughts/src/main.js',
        output: {
            format: 'iife',
            name: 'thoughts',
            file: 'thoughts/dist/js/thoughts.js',
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
