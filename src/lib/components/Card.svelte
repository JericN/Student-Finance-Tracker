<script lang="ts">
    import { twMerge } from 'tailwind-merge';

    export let accent = 'bg-primary-900';
    export let background = 'bg-light';
    export let padding = '';
    export let width = 'w-full';
</script>

<div class={twMerge('p-2', width)}>
    <div class={twMerge('border-default translate-x-1', accent)}>
        <div class={twMerge('border-default -translate-x-1.5 -translate-y-1 scale-101 p-4', background, padding)}>
            <slot />
        </div>
    </div>
</div>
