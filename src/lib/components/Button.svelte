<script lang="ts">
    import { type Colors, colors } from '$lib/models/types';
    export let accent = 'surface' as Colors;
</script>

<div class={`${colors[accent]} border-default rounded-2xl`}>
    <button
        class="border-default -translate-x-1 -translate-y-1 scale-105 rounded-2xl bg-surface-100 p-2 active:translate-x-0 active:translate-y-0"
    >
        <slot />
    </button>
</div>
