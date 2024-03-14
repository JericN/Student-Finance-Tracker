<script lang="ts">
    export let accent = 'bg-primary-900';
    export let padding = 'px-4 py-2';
</script>

<div class={`${accent} border-default rounded-2xl`}>
    <button
        class={`border-default -translate-x-1 -translate-y-1 scale-105 rounded-2xl bg-surface-100 p-2 text-dark active:translate-x-0 active:translate-y-0 ${padding}`}
        on:click
    >
        <slot />
    </button>
</div>
