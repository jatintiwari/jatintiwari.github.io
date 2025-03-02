import { terser } from 'rollup-plugin-terser';
import scss from 'rollup-plugin-scss';

const production = !process.env.ROLLUP_WATCH;

const watch = {
    clearScreen: false,
};

let configs = [
    {
        input: 'src/knowMore.js',
        output: {
            dir: 'dist',
        },
        plugins: [
            production && terser(),
            scss({
                sass: require('sass'),
                output: 'dist/knowMore.css',
                outputStyle: 'compressed',
            }),
        ],
        watch,
    },
];

export default configs;
