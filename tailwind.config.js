import forms from '@tailwindcss/forms';
import { join } from 'path';
import { sft } from './src/sft';
import { skeleton } from '@skeletonlabs/tw-plugin';
import typography from '@tailwindcss/typography';

export default {
    darkMode: 'class',
    content: [
        './src/**/*.{html,js,svelte,ts}',
        join(require.resolve('@skeletonlabs/skeleton'), '../**/*.{html,js,svelte,ts}'),
    ],
    theme: {
        extend: {
            fontSize: {
                '3xs': '6px',
                '2xs': '8px',
            },
            scale: {
                101: '1.01',
            },
            colors: {
                income: '#244b8f',
                expense: '#5e1b1b',
                neutral: '#103d1a',
            },
            gridTemplateColumns: {
                thead: '20px minmax(50px, 1fr) 50px 50px',
                tbody: '20px 70px minmax(50px, 1fr) 50px 50px',
            },
            borderRadius: {
                sm: '4px',
                xs: '2px',
            },
        },
    },
    plugins: [
        forms,
        typography,
        skeleton({
            themes: {
                custom: [sft],
            },
        }),
    ],
};
