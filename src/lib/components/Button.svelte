<script lang="ts">
    import { twMerge } from 'tailwind-merge';

    export let accent = 'bg-primary-900';
    export let padding = 'px-4 py-2';
    export let width = 'w-fit';
    export let background = 'bg-surface-100';
    export let layout = '';
    export let font = '';
</script>

<div class={twMerge('w-full p-2', width)}>
    <div class={twMerge('border-default translate-x-1', accent)}>
        <button
            class={twMerge(
                'border-default flex w-full -translate-x-1 -translate-y-1 scale-101 items-center justify-center p-4 active:translate-x-0 active:translate-y-0',
                background,
                padding,
                layout,
                font,
            )}
            on:click
        >
            <slot />
        </button>
    </div>
</div>
