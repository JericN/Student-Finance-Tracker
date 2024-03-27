<script lang="ts">
    export let accent = 'bg-primary-900';
    export let background = 'bg-surface-100';
    export let width = 'w-fit min-w-36';
    export let padding = 'px-4 py-2';
    export let font = 'font-bold';
    export let text = 'text-sm';
</script>

<div class={`p-2 ${width}`}>
    <div class={`border-default translate-x-1 ${accent}`}>
        <button
            class={`border-default w-full -translate-x-1 -translate-y-1 scale-101 active:translate-x-0 active:translate-y-0 ${background}`}
            on:click
        >
            <div class={`text-dark ${padding} ${font} ${text}`}><slot /></div>
        </button>
    </div>
</div>
