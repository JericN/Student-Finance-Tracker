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
                income: '#18366b',
                expense: '#6e1717',
                neutral: '#103d1a',
                light: 'rgba(var(--color-surface-100) / 1)',
                dark: 'rgba(var(--color-surface-900) / 1)',
            },
            gridTemplateColumns: {
                thead: '22px minmax(50px, 1fr) 50px 50px',
                tbody: '22px 70px minmax(50px, 1fr) 50px 50px',
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
