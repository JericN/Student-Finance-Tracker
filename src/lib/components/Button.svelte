<script lang="ts">
    export let accent = 'bg-primary-900';
</script>

<div class={`${accent} border-default rounded-2xl`}>
    <button
        class="border-default -translate-x-1 -translate-y-1 scale-105 rounded-2xl bg-surface-100 p-2 active:translate-x-0 active:translate-y-0"
        on:click
    >
        <slot />
    </button>
</div>
