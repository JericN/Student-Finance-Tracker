<script lang="ts">
    import { type Colors, colors } from '$lib/models/types';
    export let width = 'w-full';
    export let color = 'surface' as Colors;
</script>

<div class={width}>
    <div class={`translate-x-2 translate-y-2 rounded-xl border-2 border-surface-900 ${colors[color]}`}>
        <div
            class="-translate-x-[6px] -translate-y-[6px] scale-x-101 scale-y-105 rounded-xl border-2 border-surface-900 bg-surface-50"
        >
            <slot />
        </div>
    </div>
</div>
