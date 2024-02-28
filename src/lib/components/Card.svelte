<script lang="ts">
    import { type Colors, colors } from '$lib/models/types';

    export let width = 'w-full';
    export let accent = 'surface' as Colors;
    export let background = 'bg-surface-50';
</script>

<div class={`p-2 ${width}`}>
    <div class={`border-default rounded-xl ${colors[accent]}`}>
        <div class={`border-default -translate-x-1.5 -translate-y-1 scale-101 rounded-xl ${background}`}>
            <slot />
        </div>
    </div>
</div>
